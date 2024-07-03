function checkAdmin(req,res,next){
    if(req.user.admin){
        next()
    }
    else{
        res.status(401).send('<h1>You are not allowed to access this page!!</h1>')
    }
}
module.exports=checkAdmin