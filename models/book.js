const mongoose = require('mongoose');
const Author = require('./author');
const BookSchema = mongoose.Schema({
    name : String,
    nof_pages : Number,
    author : {
        type : mongoose.Types.ObjectId,
        ref : 'Author'
    }
})

module.exports = mongoose.model('Book',BookSchema)