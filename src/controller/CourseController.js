const Course=require('../models/courseModel')
const User=require('../models/userModel')
class CourseController{
   //GET /course/create
   async createShow(req,res,next){
    try {
        res.render('create')
    } catch (error) {
        next(error)
    }
   }   


   //POST /course/create
   async createStore(req,res,next){
    try {
       const courseObject=new Course(req.body)
       courseObject.image=`https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`
       await courseObject.save()

       req.user.courses.push(courseObject._id)
       await User.findByIdAndUpdate(req.user._id,{courses:req.user.courses})
       res.redirect('/home')
    } catch (error) {
        next(error)
    }
   }   


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
   

   //GET /course/:id/edit
   async edit(req,res,next){
       try {
          const courseObject=await Course.findOne({_id:req.params.id})
          const course=courseObject.toObject()
          res.render('edit',{course})
       } catch (error) {
          next(error)
       }
   }


   //PUT /course/:id/edit
   async editStored(req,res,next){
       try {
         await Course.findByIdAndUpdate(req.params.id,req.body)
         res.redirect('/manager')
       } catch (error) {
         next(error)
       }
   }

     
   //DELETE /course/:id/delete
   async softDelete(req,res,next){
      try {
         await Course.findByIdAndUpdate(req.params.id,{deleted:true})
         res.redirect('/manager')
      } catch (error) {
         next(error)
      }
   }



   //PUT /course/:id/restore
   async restore(req,res,next){
      try {
         await Course.findByIdAndUpdate(req.params.id,{deleted:false})
         res.redirect('/manager/trash')
      } catch (error) {
         next(error)
      }
   }

   //DELETE /course/:id/deleteForever
   async deleteForever(req,res,next){
      try {
         let courses=req.user.courses
         for(let i=0;i<courses.length;i++){
            if(courses[i]._id.toString()===req.params.id){
               courses.splice(i,1)
            }
         }
         // Xóa vĩnh viễn là xóa khỏi collection Course và xóa objectId khỏi User
         await User.findByIdAndUpdate(req.user._id,{courses})
         await Course.deleteOne({_id:req.params.id})
         res.redirect('/manager/trash')
      } catch (error) {
         next(error)
      }
   }
}
module.exports=new CourseController()