const express = require('express');
const app = express();
const connectDB = require('./config/database');

const ExpressError = require('./utils/ExpressError');
const {sendResponse} = require('./utils/sendResponse')

const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');


app.listen(8000,()=>{
    console.log("Server running on port 8000");
})

connectDB();



app.use(express.json())

app.use('/',authorRouter)
app.use('/',bookRouter)

app.all('/{*any}',(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    if(!err.message)err.message = "Something went wrong";
    if(!err.status)err.status = 500;
    sendResponse(res,status,message);
});