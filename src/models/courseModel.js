const mongoose=require('mongoose')
const express=require('express')
const Schema=mongoose.Schema

const Course=new Schema({
    name:{type:String },
    description:{type:String},
    videoId:{type:String},
    image:{type:String},
    price:{type:Number},
    about:{type:String},
    deleted: {type:Boolean,default:false},
})
module.exports=mongoose.model('Course',Course)
