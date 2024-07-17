const mongoose=require('mongoose')
const Schema=mongoose.Schema
const expresss=require('express')
const Order=new Schema({
    shoppingCarts:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,ref:'Course'
            },
            quantity:{type:Number}
        }
    ]
})

module.exports=mongoose.model('Order',Order)