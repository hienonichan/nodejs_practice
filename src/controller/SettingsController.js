const User=require('../models/userModel')
const Course=require('../models/courseModel')
const Order=require('../models/orderModel')
const bcrypt=require('bcrypt')

class SettingsController{
   //GET /settings
   async getSettings(req,res,next){
     try {
        let user=await User.findById(req.user._id)
        user=user.toObject()
        res.render('settings',{user:user})
     } catch (error) {
        console.log(error)
        next(error)
     }
   }

   // PUT /settings/change-password
   async putChangePassword(req,res,next){
      try {
        console.log(req.body)
        const newPassword=req.body.password
         // hash password
         const salt=await bcrypt.genSalt(10)
         const hashed=await bcrypt.hash(newPassword,salt)
         //update newHashedPassword
         await User.findByIdAndUpdate(req.user._id,{password:hashed})
         res.json({message:'change succesfully'})
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}


module.exports=new SettingsController()