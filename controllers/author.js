const Author = require('../models/author');
const {sendResponse} = require('../utils/sendResponse')
const ExpressError = require('../utils/ExpressError')

module.exports.getAllAuthor = async(req,res)=>{
    const author = await Author.find({});
    sendResponse(res,200,"Succesfully fetched",{author})
}

module.exports.getIndividualAuthor = async(req,res)=>{
    const {id} = req.params;
    const author = await Author.findById(id).populate('books');
    if(!author){
       throw new ExpressError(404,"Author not found");
    }else{
        sendResponse(res,200,"Succesfully fetched",{author})
    }
}

module.exports.createAuthor = (req,res)=>{
    const author = new Author(req.body.author)
    author.save();
    sendResponse(res,201,"Succesfully Created",{author})
}

module.exports.updateAuthor = async(req,res)=>{
    const id = req.params.id;
    const author = await Author.findByIdAndUpdate(id,req.body.author);
    author.save();
    sendResponse(res,200,"Succesfully Updated",{author})
}

module.exports.deleteAuthor = async(req,res)=>{
    const {id} = req.params;
    await Author.findByIdAndDelete(id);
    sendResponse(res,200,"Succesfully deleted")
}
