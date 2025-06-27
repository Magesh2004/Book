const {sendResponse} = require('../config/sendResponse')
const ExpressError = require('../utils/ExpressError')

const {connection} = require('../config/database')

module.exports.getAllAuthor = async(req,res)=>{
    const author = await connection.query('select * from author');
    sendResponse(res,200,"Succesfully fetched",{author:author.rows})
}

module.exports.getIndividualAuthor = async(req,res)=>{
    const {id} = req.params;
    const author =await connection.query('select * from author where id=$1',[id]);
    const book =await connection.query('select * from book where author_id = $1',[id]);
    if(author.rows.length == 0){
        throw new ExpressError(404,"Author not found")
    }
    sendResponse(res,200,"Succesfully fetched",{author:author.rows,book:book.rows})
}

module.exports.createAuthor = (req,res)=>{
    const {name,bio} = req.body;
    connection.query('insert into author(name,bio) values($1,$2)',[name,bio]);
    sendResponse(res,201,"Succesfully created")
}

module.exports.updateAuthor = async(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    await connection.query('update author set name=$1 where id = $2',[name,id])
    sendResponse(res,200,"Succesfully Updated")
}

module.exports.deleteAuthor = async(req,res)=>{
    const {id} = req.params;
    await connection.query('delete from author where id = $1',[id])
    sendResponse(res,200,"Succesfully Deleted") 
}
