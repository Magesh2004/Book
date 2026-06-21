const {connection} = require('../config/database')
const {sendResponse} =  require('../config/sendResponse');
const ExpressError = require('../utils/ExpressError');

module.exports.createBook = async(req,res)=>{
    const {id} = req.params;
    const {name,nof_pages} = req.body;
    if (!name || !nof_pages) {
        throw new ExpressError(400, 'Missing required fields: name and nof_pages');
    }
    await connection.query('insert into book(name,nof_pages,author_id) values($1,$2,$3)',[name,nof_pages,id]);
    sendResponse(res,201,"Successfully created")
}

module.exports.getBook = async(req,res)=>{
    const {bookid} = req.params;
    const book =await connection.query('select * from book where id=$1',[bookid]);
    if(book.rows.length == 0){
        throw new ExpressError(404,"book not found")
    }
    sendResponse(res,201,"Successfully fetched",{book:book.rows})
}

module.exports.updateBook = async(req,res)=>{
    const {bookid} = req.params;
    const {name} = req.body;
    if (!name) {
        throw new ExpressError(400, 'Missing required field: name');
    }
    await connection.query('update book set name=$1 where id = $2',[name,bookid]);
    sendResponse(res,201,"Successfully Updaed")
}

module.exports.deleteBook = async(req,res)=>{
    const {bookid} = req.params;
    await connection.query('delete from book where id = $1',[bookid])
    sendResponse(res,200,"Successfully deleted")
}