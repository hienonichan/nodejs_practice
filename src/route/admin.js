const express=require('express')
const router=express.Router()
const adminController=require('../controller/AdminController')

router.put('/course/:id/restore',adminController.restore)
router.delete('/course/:id/deleteForever',adminController.deleteForever)
router.put('/course/:id/delete',adminController.softDelete)
router.get('/course/:id/edit',adminController.edit)
router.put('/course/:id/edit',adminController.editStored)
router.get('/course/create',adminController.createShow)
router.post('/course/create',adminController.createStore)

router.get('/manager/trash',adminController.trash)
router.get('/manager',adminController.show)
module.exports=router