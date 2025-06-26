const Author = require('../models/author');
const Book = require('../models/book');
const {sendResponse} =  require('../config/sendResponse');
const ExpressError = require('../utils/ExpressError');

module.exports.createBook = async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id);
    const book = new Book(req.body.book);
    book.author = author._id;
    author.books.push(book);
    await author.save();
    await book.save();
    sendResponse(res,201,"Successfully created",{book})
}

module.exports.getBook = async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findById(bookid);
    if(!book){
        throw new ExpressError(404,"invalid book")
    }
    sendResponse(res,200,"Successfully fetched",{book})
}

module.exports.updateBook = async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findByIdAndUpdate(bookid,req.body.book);
    book.save();
    sendResponse(res,201,"Successfully updated",{book})
}

module.exports.deleteBook = async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findByIdAndDelete(bookid);
    sendResponse(res,200,"Successfully deleted")
}