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

AuthorSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await books.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Author',AuthorSchema);