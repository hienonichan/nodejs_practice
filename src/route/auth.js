const authController=require('../controller/AuthController')
const express=require('express')
const router=express.Router()
router.get('/login',authController.loginGET)
router.get('/register',authController.registerGET)
router.post('/login',authController.loginPOST)
router.post('/register',authController.registerPOST)
router.get('/logout',authController.logoutGET)
module.exports=router
