const Course=require('../models/courseModel')
const User=require('../models/userModel')


class ManagerController{
    //GET manager/

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
    //GET manager/trash
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

module.exports=new ManagerController()