const Order=require('../models/orderModel')
const User=require('../models/userModel')
const Course=require('../models/courseModel')

class OrderController{
    // POST /order/create-order
    async createOrder(req,res,next){
        try {
          const user=await User.findById(req.user._id).populate({path:'shoppingCarts.product'})
          const shoppingCarts=user.shoppingCarts
          // create order
          const order=new Order({shoppingCarts:shoppingCarts})
          await order.save()
          // thêm objectId của order vào mảng orders user và xóa cart
          let orders=req.user.orders
          orders.push(order._id)
          await User.findByIdAndUpdate(req.user._id,{orders:orders,shoppingCarts:[]})
          res.redirect('/order/get-orders')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    //GET /order/getOrders
    async getOrders(req,res,next){
        try {
           const user=await User.findById(req.user._id).populate({path:'orders'})
           let orders=user.orders
           // lấp products vào orders và tính tiền
           let arrayOrderWithPrice=[]
           for(let index=0;index<orders.length;index++){
             let orderPrice=0
             orders[index]=await Order.findById(orders[index]._id).populate({path:'shoppingCarts.product'})
             let arrayProduct=orders[index].shoppingCarts
             // tính tiền mỗi order
             for(let i=0;i<arrayProduct.length;i++){
                orderPrice+=arrayProduct[i].product.price*arrayProduct[i].quantity
             }
             arrayOrderWithPrice.push({order:orders[index].toObject(),totalPrice:orderPrice}) 
           }
           res.render('orders',{ordersData:arrayOrderWithPrice})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }    


    //POST /order/checkout/:id
    async checkout(req,res,next){
      try {
        // xóa document id khỏi collection Order
        await Order.findByIdAndDelete(req.params.id)
        // xóa id của order khỏi orders của user
        let orders=req.user.orders
        orders=orders.filter(id=>id.toString()!==req.params.id)
        await User.findByIdAndUpdate(req.user._id,{orders:orders})
        res.redirect('/order/get-orders')
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
}
module.exports=new OrderController
