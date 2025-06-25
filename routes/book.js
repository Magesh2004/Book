const express = require('express')
const router = express.Router({ mergeParams: true });

const Author = require('../models/author');
const Book = require('../models/book');


router.route('/')
.post(async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id);
    const book = new Book(req.body.book);
    book.author = author._id;
    author.books.push(book);
    await author.save();
    await book.save()
    res.json({book});
})

router.route('/:bookid')
.get(async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findById(bookid);
    res.json({book})
})
.put(async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findByIdAndUpdate(bookid,req.body.book);
    book.save();
    res.json({book});
})
.delete(async(req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findByIdAndDelete(bookid);
    res.json({book});
})

module.exports = router;