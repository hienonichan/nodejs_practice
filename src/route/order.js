const express=require('express')
const router=express.Router()
const orderController=require('../controller/OrderController')
router.get('/get-orders',orderController.getOrders)
router.post('/checkout/:id',orderController.checkout)
router.post('/create-order',orderController.createOrder)
module.exports=router