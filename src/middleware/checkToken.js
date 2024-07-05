
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
 async function checkToken(req,res,next){
    const accessToken=req.cookies.accessToken
    if(!accessToken){
       console.log('token khong ton tai de xac thuc phien dang nhap')
       return res.redirect('/auth/login')
    }
    try {
       jwt.verify(accessToken,process.env.secretKey,async (err,payload)=>{
            if(err){
               if(err.name==='TokenExpiredError'){
                const refreshToken=req.cookies.refreshToken
                if(!refreshToken){
                    console.log('refresh token khong ton tai')
                    return res.redirect('/auth/login')
                }
                try {
                            // fetch để refreshToken
                            const response=await fetch('http://localhost:3000/auth/token',{
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ token: refreshToken })
                            }
                            )
                            const result=await response.json()
                            res.cookie('accessToken',result.accessToken,{httpOnly:true})
                            res.cookie('refreshToken',result.refreshToken,{httpOnly:true})
                            req.cookies.accessToken=result.accessToken
                            req.cookies.refreshToken=result.refreshToken
                            next()
                        } catch (error) {
                            console.log('accessToken is invalid but cant refresh')
                            return res.redirect('/auth/login')
                        }
               }
               else{
                console.log('accessToken khong ton tai')
                return res.redirect('/auth/login')
               }
            } 
            else{
            next()
        }
       })
    } catch (error) {
        console.log('token khong hop le de xac thuc phien dang nhap')
        return res.redirect('/auth/login')
    }
}

module.exports=checkToken