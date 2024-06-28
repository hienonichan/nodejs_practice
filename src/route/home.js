const homeController=require('../controller/HomeController')
const express=require('express')
const router=express.Router()
router.get('/',homeController.show)
module.exports=router