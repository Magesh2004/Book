const express = require('express')
const router = express.Router();

const Author = require('../models/author');

router.route('/')
.get(catchAsync(async(req,res)=>{
    const author = await Author.find({});
    res.json({author});
}))
.post((req,res)=>{
    const newAuthor = new Author(req.body.author)
    newAuthor.save();
    res.json({newAuthor})
})

router.route('/:id')
.get(catchAsync(async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id).populate('books');
    res.json({author});
}))
.put(catchAsync(async(req,res)=>{
    const id = req.params.id;
    const author = await Author.findByIdAndUpdate(id,req.body.author);
    author.save();
    res.json({author})
}))
.delete(catchAsync(async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findByIdAndDelete(id);
    res.json({author});
}))

module.exports = router;

