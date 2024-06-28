const mongoose=require('mongoose')
const Course=require('../models/courseModel')
const User=require('../models/userModel')
class HomeController{
    // GET /home
    async show(req,res,next){
        try {   const user=await User.findById(req.user._id).populate({path:'courses',match:{deleted:false}})
                //const course=await Course.find({deleted:false})
                const course=user.courses
                const courseObject=course.map(course=>course.toObject())
                res.render('home',{courseObject})
        } catch (error) {
            next(error)
        }
    }
}
module.exports=new HomeController()



