const express=require('express')
const router=express.Router()
const courseController=require('../controller/CourseController')
router.get('/detail/:id',courseController.showDetail)
module.exports=router