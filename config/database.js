const {Client} = require('pg');
require('dotenv').config();

const connection = new Client({
    host : 'localhost',
    user : process.env.DB_USER,
    port : process.env.PORT,
    password : process.env.DB_PASSWORD,
    database : 'book'
})

const connectDB = ()=>{
    connection.connect().then(()=>{
    console.log("The database is connected");
}).catch((err)=>{
    console.log(err);
})
}

module.exports = {connectDB,connection};

