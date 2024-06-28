const express=require('express')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User=new Schema({
    name:{type:String,required:true,default:'cloneUser'},
    username:{type:String,required:true},
    password:{type:String,required:true},
    courses:[{type: mongoose.Schema.Types.ObjectId,ref: 'Course'}]
    // courses là mảng chứa các objectId của model Course
})
module.exports=mongoose.model('User',User)