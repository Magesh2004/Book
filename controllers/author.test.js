const authorController = require('./author');
const ExpressError = require('../utils/ExpressError');

jest.mock('../config/database', () => ({
  connection: {
    query: jest.fn()
  }
}));
const { connection } = require('../config/database');

const mockSendResponse = jest.fn();
jest.mock('../config/sendResponse', () => ({
  sendResponse: (...args) => mockSendResponse(...args)
}));

const makeRes = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() });

describe('Author Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllAuthor should send all authors', async () => {
    const res = makeRes();
    const authors = [{ id: 1, name: 'Test Author' }];
    connection.query.mockResolvedValueOnce({ rows: authors });
    await authorController.getAllAuthor({}, res);
    expect(connection.query).toHaveBeenCalledWith('select * from author');
    expect(mockSendResponse).toHaveBeenCalledWith(res, 200, 'Succesfully fetched', { author: authors });
  });

  test('getIndividualAuthor should send author and books if found', async () => {
    const res = makeRes();
    const req = { params: { id: 1 } };
    const authorRows = [{ id: 1, name: 'Test Author' }];
    const bookRows = [{ id: 1, name: 'Test Book', author_id: 1 }];
    connection.query
      .mockResolvedValueOnce({ rows: authorRows })
      .mockResolvedValueOnce({ rows: bookRows });
    await authorController.getIndividualAuthor(req, res);
    expect(connection.query).toHaveBeenCalledWith('select * from author where id=$1', [1]);
    expect(connection.query).toHaveBeenCalledWith('select * from book where author_id = $1', [1]);
    expect(mockSendResponse).toHaveBeenCalledWith(res, 200, 'Succesfully fetched', { author: authorRows, book: bookRows });
  });

  test('getIndividualAuthor should throw ExpressError if author not found', async () => {
    const res = makeRes();
    const req = { params: { id: 1 } };
    connection.query.mockResolvedValueOnce({ rows: [] });
    await expect(authorController.getIndividualAuthor(req, res)).rejects.toThrow(ExpressError);
  });

  test('createAuthor should insert author and send response', () => {
    const res = makeRes();
    const req = { body: { name: 'New Author', bio: 'Bio' } };
    authorController.createAuthor(req, res);
    expect(connection.query).toHaveBeenCalledWith('insert into author(name,bio) values($1,$2)', ['New Author', 'Bio']);
    expect(mockSendResponse).toHaveBeenCalledWith(res, 201, 'Succesfully created');
  });

  test('updateAuthor should update author and send response', async () => {
    const res = makeRes();
    const req = { params: { id: 1 }, body: { name: 'Updated Name' } };
    connection.query.mockResolvedValueOnce();
    await authorController.updateAuthor(req, res);
    expect(connection.query).toHaveBeenCalledWith('update author set name=$1 where id = $2', ['Updated Name', 1]);
    expect(mockSendResponse).toHaveBeenCalledWith(res, 200, 'Succesfully Updated');
  });

  test('deleteAuthor should delete author and send response', async () => {
    const res = makeRes();
    const req = { params: { id: 1 } };
    connection.query.mockResolvedValueOnce();
    await authorController.deleteAuthor(req, res);
    expect(connection.query).toHaveBeenCalledWith('delete from author where id = $1', [1]);
    expect(mockSendResponse).toHaveBeenCalledWith(res, 200, 'Succesfully Deleted');
  });
}); 