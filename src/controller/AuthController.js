
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
class AuthController{
    //GET /auth/login
    loginGET(req,res,next){
        try {
          res.render('auth/login')
        } catch (error) {
            next(error)
        }
    }
    //POST /auth/login
    async loginPOST(req,res,next){
        try {
           const user=await User.findOne({username:req.body.username})
           if(!user){
             console.log('tai khoan khong ton tai')
             res.status(401).redirect('/auth/login')
             return   
           }   
           if(user.password!==req.body.password){
            console.log('mat khau khong chinh xac')
            res.status(401).redirect('/auth/login')
            return
           }
           const token=jwt.sign(req.body,process.env.secretKey)
           res.cookie('token',token,{httpOnly:true})
           res.redirect('/home')
        }
        catch (error) {
            next(error)
        }
    }
    //GET /auth/register
    registerGET(req,res,next){
        try {
            res.render('auth/register')
        } catch (error) {
            next(error)
        }
    }
    
    //POST /auth/register
    async registerPOST(req,res,next){
        try {
           const user= new User(req.body)
           await user.save()
           res.redirect('/auth/login')
        } catch (error) {
            next(error)
        }
    }

    //GET /auth/logout
    logoutGET(req,res,next){
        res.cookie('token','',{maxAge:0})
        res.redirect('/auth/login')
    }
}
module.exports=new AuthController()