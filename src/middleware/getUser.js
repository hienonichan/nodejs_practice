const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

async function getUser(req,res,next){
    const payload=jwt.verify(req.cookies.accessToken,process.env.secretKey)
    if(payload.username=='admin'){
         // nếu username là admin thì update element admin thành true
        await User.findOneAndUpdate({username:'admin'},{admin:true})
    }
    let user=await User.findOne({username:payload.username})
    user=user.toObject()
    //Lưu locals toàn cục để render trong template engine
    res.locals.user={name:user.name}
    // middleware truyền user vào req để function handler cuối xử lí
    req.user={_id:user._id,admin:user.admin,courses:user.courses,shoppingCarts:user.shoppingCarts}
    next()
}
module.exports=getUser