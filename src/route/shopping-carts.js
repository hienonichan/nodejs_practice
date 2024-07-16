const shoppingCartsController=require('../controller/ShoppingCartsController')
const express=require('express')
const router=express.Router()
router.put('/:id',shoppingCartsController.pop)
router.post('/:id',shoppingCartsController.push)
router.get('/',shoppingCartsController.show)
module.exports=router