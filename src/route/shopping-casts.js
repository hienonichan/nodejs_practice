const shoppingCastsController=require('../controller/ShoppingCastsController')
const express=require('express')
const router=express.Router()
router.post('/:id',shoppingCastsController.push)
router.get('/',shoppingCastsController.show)
module.exports=router