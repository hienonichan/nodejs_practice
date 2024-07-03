
function errHandler(err,req,res,next){
    console.error(err.stack)
    res.status(401).json({message:'something was broken!'})
}

module.exports=errHandler