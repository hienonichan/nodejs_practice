
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


  //function create Token
function generateAccessToken(user){
    return jwt.sign({username:user.username},process.env.secretKey,{expiresIn:'3s'})
}
 function generateRefreshToken(user){
    return jwt.sign({username:user.username},process.env.refreshKey,{expiresIn:'2d'})
}
//fake database refreshTokens
let refreshTokens=[]

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
           // compare password from submit and hashed password from DB
           const validPassword=await bcrypt.compare(req.body.password,user.password)
           if(!validPassword){
            console.log('mat khau khong chinh xac')
            res.status(401).redirect('/auth/login')
            return
           }
           //create accessToken
           const accessToken=generateAccessToken(user)
           res.cookie('accessToken',accessToken,{httpOnly:true})
           //create refreshToken
           const refreshToken=generateRefreshToken(user)
           res.cookie('refreshToken',refreshToken,{httpOnly:true})
           refreshTokens.push(refreshToken)
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
            // hash password
           const salt=await bcrypt.genSalt(10)
           const hashed=await bcrypt.hash(req.body.password,salt)
           const user= new User({
             name:req.body.name,
             username:req.body.username,
             password:hashed,
           })
           await user.save()
           res.redirect('/auth/login')
        } catch (error) {
            next(error)
        }
    }

    //GET /auth/logout
    logoutGET(req,res,next){
        res.cookie('accessToken','',{maxAge:0})
        res.cookie('refreshToken','',{maxAge:0})
        res.redirect('/auth/login')
    }
   //route refresh token
    //POST /auth/token
    tokenPOST(req,res,next){
        try {
                const refreshToken=req.body.token
                if(!refreshToken){
                    return res.status(401).send('refreshToken is null')
                }
                if(!refreshTokens.includes(refreshToken)){
                    return res.status(403).send('can not find refreshToken in database')
                }
                const payload=jwt.verify(refreshToken,process.env.refreshKey)

                //Xóa token cũ và tạo accessToken ,refreshToken mới
                const newAccessToken=generateAccessToken({username:payload.username})
                const newRefreshToken=generateRefreshToken({username:payload.username})
                
                refreshTokens = refreshTokens.filter(token => token !== refreshToken)
                refreshTokens.push(newRefreshToken)
                res.json({accessToken:newAccessToken,refreshToken:newRefreshToken})
        } catch (error) {
            res.status(401).send('refreshToken is invalid')
        }
    }
}
module.exports=new AuthController()

//Store token

//1. local storage
//2. httpOnly cookies
//3. redux storage->accessToken
     //httpOnly cookies->refreshToken
