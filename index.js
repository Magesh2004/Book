const express = require('express');
const app = express();
const mongoose = require('mongoose');

const ExpressError = require('./utils/ExpressError');


const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');


app.listen(8000,()=>{
    console.log("Server running on port 8000");
})

mongoose.connect('mongodb://localhost:27017/Book');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection error"));
db.once('open',()=>{
    console.log("The database is connected");
})


app.use(express.json())

app.use('/author',authorRouter)
app.use('/author/:id/book',bookRouter)

app.all('/{*any}',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    if(!err.message)err.message = "Something went wrong"
    res.json({err});
});