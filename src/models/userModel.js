const express=require('express')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User=new Schema({
    name:{type:String,required:true,unique:true,default:'cloneUser'},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    courses:[{type: mongoose.Schema.Types.ObjectId,ref: 'Course'}],
    // courses là mảng chứa các khóa học user sở hữu
    shoppingCarts:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,ref:'Course'
        },
        quantity:{type:Number}
    }
    ],
    // shoppingCasts là mảng chứa các khóa học user thêm vào giỏ hàng
    admin:{type:Boolean,default:false},
    // element admin để làm chức năng phân quyền
})
module.exports=mongoose.model('User',User)