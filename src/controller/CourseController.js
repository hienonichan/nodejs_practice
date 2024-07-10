const Course=require('../models/courseModel')
const User=require('../models/userModel')
class CourseController{
   //GET /course/detail/:id
   async showDetail(req,res,next){
      try {
          const course=await Course.findOne({_id:req.params.id})
         const courseObject=course.toObject()
         res.render('courseDetail',{courseObject})
      } catch (error) {
         next(error)
      }
    }
}
module.exports=new CourseController()