module.exports.sendResponse = (res,status,message,data)=>{
    res.status(status).json({
        status,
        message,
        data
    })

}