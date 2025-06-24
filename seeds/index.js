const mongoose = require('mongoose');
const Author = require('../models/author');
const Book = require('../models/book')

mongoose.connect('mongodb://localhost:27017/Book');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection error"));
db.once('open',()=>{
    console.log("The database is connected");
})
const seed = async()=>{
    await Author.deleteMany({});
    await Book.deleteMany({});
    
    const authorsData = [
      { name: "J.K. Rowling", bio: "British author, best known for the Harry Potter series." },
      { name: "George R.R. Martin", bio: "Author of the fantasy series A Song of Ice and Fire." },
      { name: "Agatha Christie", bio: "Queen of mystery and detective fiction." },
      { name: "Dan Brown", bio: "American author known for thriller novels like The Da Vinci Code." },
      { name: "Haruki Murakami", bio: "Japanese author famous for surreal storytelling." }
    ];

    const createdAuthors = await Author.insertMany(authorsData);

    const booksData = [
      { name: "Harry Potter and the Philosopher's Stone", nof_pages: 223, author: createdAuthors[0]._id },
      { name: "A Game of Thrones", nof_pages: 694, author: createdAuthors[1]._id },
      { name: "Murder on the Orient Express", nof_pages: 256, author: createdAuthors[2]._id },
      { name: "The Da Vinci Code", nof_pages: 454, author: createdAuthors[3]._id },
      { name: "Norwegian Wood", nof_pages: 296, author: createdAuthors[4]._id }
    ];

    const createdBooks = await Book.insertMany(booksData);

    for(let i = 0;i<createdAuthors.length;i++){
        createdAuthors[i].books = [createdBooks[i]._id];
        console.log(`Assigning ${createdBooks[i].name} to ${createdAuthors[i].name}`);
        await createdAuthors[i].save();
    }
    console.log("The data has been inserted");
    const authorsCheck = await Author.find().populate('books');
console.log("Final authors with books:", JSON.stringify(authorsCheck, null, 2));

    mongoose.disconnect()
}
seed()