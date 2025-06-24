const mongoose = require('mongoose');
const Book = require('./book')
const Schema = mongoose.Schema;

const AuthorSchema = Schema({
    name : String,
    bio : String,
    books : [{
        type:mongoose.Types.ObjectId,
        ref : 'Book'
    }]
})
module.exports = mongoose.model('Author',AuthorSchema);