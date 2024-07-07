const User=require('../models/userModel')
const Course=require('../models/courseModel')

class ShoppingCastsController{
    //GET /shopping-casts
   async show(req,res,next){
    try {
        const user=await User.findById(req.user._id).populate({path:'shoppingCasts'})
        const courseObject=user.shoppingCasts
        const course=courseObject.map(courseObject=>courseObject.toObject())
         res.render('shopping-casts',{course})
    } catch (error) {
        next(error)
    }
   }

  //POST /shopping-casts/:id
   async push(req,res,next){
      try {
        let array=req.user.shoppingCasts
        array.push(req.params.id)
        await User.findByIdAndUpdate(req.user._id,{shoppingCasts:array})
        res.redirect('/home')
      } catch (error) {
        next(error)
      }
   }
}

module.exports=new ShoppingCastsController()