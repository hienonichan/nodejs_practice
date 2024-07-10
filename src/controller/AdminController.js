const Course=require('../models/courseModel')
const User=require('../models/userModel')

class AdminController{
    //GET admin/course/create
   async createShow(req,res,next){
    try {
        res.render('create')
    } catch (error) {
        next(error)
    }
   }   


   //POST admin/course/create
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

   //GET admin/course/:id/edit
   async edit(req,res,next){
       try {
          const courseObject=await Course.findOne({_id:req.params.id})
          const course=courseObject.toObject()
          res.render('edit',{course})
       } catch (error) {
          next(error)
       }
   }
   //PUT admin/course/:id/edit
   async editStored(req,res,next){
       try {
         await Course.findByIdAndUpdate(req.params.id,req.body)
         res.redirect('/admin/manager')
       } catch (error) {
         next(error)
       }
   }
   //PUT admin/course/:id/delete
   async softDelete(req,res,next){
      try {
         await Course.findByIdAndUpdate(req.params.id,{deleted:true})
         res.redirect('/admin/manager')
      } catch (error) {
         next(error)
      }
   }
   //PUT admin/course/:id/restore
   async restore(req,res,next){
      try {
         await Course.findByIdAndUpdate(req.params.id,{deleted:false})
         res.redirect('/admin/manager/trash')
      } catch (error) {
         next(error)
      }
   }

   //DELETE admin/course/:id/deleteForever
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
         res.redirect('/admin/manager/trash')
      } catch (error) {
         next(error)
      }
   }

    //GET /admin/manager/
    async show(req,res,next){
        try {
            const user=await User.findById(req.user._id).populate({path:'courses',match:{deleted:false}})
            const user2=await User.findById(req.user._id).populate({path:'courses',match:{deleted:true}})
            const number=user2.courses.length
            const courseObject=user.courses
            const course=courseObject.map(courseObject=>courseObject.toObject())
            res.render('courseManager/stored-course',{course,number})
        } catch (error) {
            next(error)
        }
    }
    //GET /admin/manager/trash
    async trash(req,res,next){
        try {
            const user=await User.findById(req.user._id).populate({path:'courses',match:{deleted:true}})
            const course=user.courses
            const courseObject=course.map(course=>course.toObject())
            res.render('courseManager/trash-course',{course:courseObject})
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new AdminController()