const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate')
const path = require('path');
const methodOverride = require('method-override');

const Author = require('./models/author');
const Book = require('./models/book');
const author = require('./models/author');

app.listen(8000,()=>{
    console.log("Server running on port 3000");
})

mongoose.connect('mongodb://localhost:27017/Book');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection error"));
db.once('open',()=>{
    console.log("The database is connected");
})

app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
    const authors = await Author.find({});
    res.render('home',{authors});
})
app.get('/books/:id',async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id).populate('books');
    res.render('author',{author});
})
app.get('/new',(req,res)=>{
    res.render('new');
})
app.post('/',(req,res)=>{
    const newAuthor = new Author(req.body.author)
    newAuthor.save();
    res.redirect('/');
})
app.post('/:id',async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id);
    const book = new Book(req.body.book);
    book.author = author._id;
    author.books.push(book);
    await author.save();
    await book.save()
    console.log(author);
    console.log(book);
    res.redirect(`/books/${id}`);
})