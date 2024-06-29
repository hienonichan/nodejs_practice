
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
 async function checkToken(req,res,next){
    const token=req.cookies.token
    if(!token){
       console.log('token khong ton tai de xac thuc phien dang nhap')
       return res.redirect('/auth/login')
    }
    try {
        const payload=jwt.verify(token,process.env.secretKey)
        let user=await User.findOne({username:payload.username})
        user=user.toObject()
        // res.locals lưu data toàn cục để render trong handlebars
        res.locals.user={name:user.name}
        // các middle có thể chỉnh sửa req tùy ý(có thể dùng lưu data) từ middleware này 
        //sang midd khác đến hàm handler cuối cùng phản hồi res
        req.user={_id:user._id,courses:user.courses}
        next()
    } catch (error) {
        console.log('token khong hop le de xac thuc phien dang nhap')
        return res.redirect('/auth/login')
    }
}

module.exports=checkToken