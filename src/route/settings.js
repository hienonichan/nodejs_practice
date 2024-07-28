const express=require('express')
const router=express.Router()
const settingsController=require('../controller/SettingsController')
const upload=require('../config/multer')
router.put('/change-password',settingsController.putChangePassword)
router.get('/',settingsController.getSettings)
module.exports=router