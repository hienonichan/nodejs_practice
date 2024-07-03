
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
 async function checkToken(req,res,next){
    const accessToken=req.cookies.accessToken
    // console.log(accessToken)
    // if(!accessToken){
    //    console.log('token khong ton tai de xac thuc phien dang nhap')
    //    return res.redirect('/auth/login')
    // }
    try {
       // const payload=jwt.verify(accessToken,process.env.secretKey)
       jwt.verify(accessToken,process.env.secretKey,async (err,payload)=>{
            if(err){
               if(err.name==='TokenExpiredError'){
                const refreshToken=req.cookies.refreshToken
                if(!refreshToken){
                    console.log('refresh token is out of time')
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
                    return res.send('refresh Token successfully')
                } catch (error) {
                    return res.redirect('/auth/login')
                }
               }
               else{
                console.log('accessToken khong ton tai')
                return res.redirect('/auth/login')
               }
            } 
            else{
            if(payload.username==='admin'){
                // nếu username là admin thì update element admin thành true
                await User.findOneAndUpdate({username:payload.username},{admin:true})
            }
            let user=await User.findOne({username:payload.username})
            user=user.toObject()
            // res.locals lưu data toàn cục để render trong handlebars
            res.locals.user={name:user.name}
            // các middle có thể chỉnh sửa req tùy ý(có thể dùng lưu data) từ middleware này 
            //sang midd khác đến hàm handler cuối cùng phản hồi res
            req.user={_id:user._id,admin:user.admin,courses:user.courses}
            next()
        }
       })
       
    } catch (error) {
        console.log('token khong hop le de xac thuc phien dang nhap')
        return res.redirect('/auth/login')
    }
}

module.exports=checkToken