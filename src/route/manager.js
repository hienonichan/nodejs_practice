const managerController=require('../controller/ManagerController')
const express=require('express')
const router=express.Router()
router.get('/trash',managerController.trash)
router.get('/',managerController.show)
module.exports=router