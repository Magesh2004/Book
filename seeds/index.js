const { connectDB, connection } = require('../config/database');

const authorData = require('./authorData');
const bookData = require('./bookData');

const catchAsync = require('../utils/catchAsync')

connectDB();

const seedDb = catchAsync(async()=>{
  await connection.query('delete from book');
  await connection.query('delete from author');
  
const authorIds = [];

for(const author of authorData){
  const result = await connection.query(
  'INSERT INTO author(name, bio) VALUES($1, $2) RETURNING id',
  [author.name, author.bio]
);
authorIds.push(result.rows[0].id);
}


for(const book of bookData){
  await connection.query('insert into book(name,nof_pages,author_id) values($1,$2,$3)',[book.name,book.nof_pages,authorIds[book.authorIndex]]);
}

console.log("data updated")
await connection.end();
console.log("Data base closed");

})
seedDb();