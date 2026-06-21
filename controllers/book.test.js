const bookController = require('./book');
const ExpressError = require('../utils/ExpressError');

jest.mock('../config/database', () => ({
  connection: {
    query: jest.fn()
  }
}));
const { connection } = require('../config/database');

const makeRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Book Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBook', () => {
    test('should insert book and send 201 response', async () => {
      const res = makeRes();
      const req = { params: { id: 1 }, body: { name: 'Book Name', nof_pages: 123 } };
      connection.query.mockResolvedValueOnce();
      await bookController.createBook(req, res);
      expect(connection.query).toHaveBeenCalledWith('insert into book(name,nof_pages,author_id) values($1,$2,$3)', ['Book Name', 123, 1]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 201, message: 'Successfully created', data: undefined });
    });

    test('should handle missing name or nof_pages', async () => {
      const res = makeRes();
      const req = { params: { id: 1 }, body: { nof_pages: 123 } };
      await expect(bookController.createBook(req, res)).rejects.toThrow();
      // If you want to handle missing fields gracefully, add logic in controller and test for it
    });

    test('should handle db error', async () => {
      const res = makeRes();
      const req = { params: { id: 1 }, body: { name: 'Book Name', nof_pages: 123 } };
      connection.query.mockRejectedValueOnce(new Error('DB error'));
      await expect(bookController.createBook(req, res)).rejects.toThrow('DB error');
    });
  });

  describe('getBook', () => {
    test('should send book if found', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 } };
      const bookRows = [{ id: 1, name: 'Book Name', author_id: 1 }];
      connection.query.mockResolvedValueOnce({ rows: bookRows });
      await bookController.getBook(req, res);
      expect(connection.query).toHaveBeenCalledWith('select * from book where id=$1', [1]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 201, message: 'Successfully fetched', data: { book: bookRows } });
    });

    test('should throw ExpressError if book not found', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 } };
      connection.query.mockResolvedValueOnce({ rows: [] });
      await expect(bookController.getBook(req, res)).rejects.toThrow(ExpressError);
    });

    test('should handle db error', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 } };
      connection.query.mockRejectedValueOnce(new Error('DB error'));
      await expect(bookController.getBook(req, res)).rejects.toThrow('DB error');
    });
  });

  describe('updateBook', () => {
    test('should update book and send 201 response', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 }, body: { name: 'Updated Book' } };
      connection.query.mockResolvedValueOnce();
      await bookController.updateBook(req, res);
      expect(connection.query).toHaveBeenCalledWith('update book set name=$1 where id = $2', ['Updated Book', 1]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 201, message: 'Successfully Updaed', data: undefined });
    });

    test('should handle missing name', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 }, body: {} };
      await expect(bookController.updateBook(req, res)).rejects.toThrow();
    });

    test('should handle db error', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 }, body: { name: 'Updated Book' } };
      connection.query.mockRejectedValueOnce(new Error('DB error'));
      await expect(bookController.updateBook(req, res)).rejects.toThrow('DB error');
    });
  });

  describe('deleteBook', () => {
    test('should delete book and send 200 response', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 } };
      connection.query.mockResolvedValueOnce();
      await bookController.deleteBook(req, res);
      expect(connection.query).toHaveBeenCalledWith('delete from book where id = $1', [1]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'Successfully deleted', data: undefined });
    });

    test('should handle db error', async () => {
      const res = makeRes();
      const req = { params: { bookid: 1 } };
      connection.query.mockRejectedValueOnce(new Error('DB error'));
      await expect(bookController.deleteBook(req, res)).rejects.toThrow('DB error');
    });
  });
}); 