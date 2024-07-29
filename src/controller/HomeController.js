const mongoose = require("mongoose");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
class HomeController {
  // GET /home  //get all courses from all admins
  async show(req, res, next) {
    try {
      let searchName=req.query.name
      let aboutArray=req.query['about']
      let priceString=req.query.price
      const course = await Course.find({})
      let courseObject = course.map((course) => course.toObject());
      //searching logic
      if(searchName){
        // filter course by searching name
         searchName=searchName.toLowerCase()
         let courseArray=[]
         for(let index=0;index<courseObject.length;index++){
            let courseName=courseObject[index].name.toLowerCase()
            if(courseName.includes(searchName)){
                courseArray.push(courseObject[index])
            }
         }
         courseObject=courseArray
      }
      // filter by name
      if(aboutArray){
        let courseArray=[]
        for(let index=0;index<courseObject.length;index++){
          let aboutString=courseObject[index].about.toString()
          let checkAbout=false


          if(Array.isArray(aboutArray)){
          for(let k=0;k<aboutArray.length;k++){
            if(aboutString.includes(aboutArray[k])){
              checkAbout=true
            }
          }
          }
          else{
            if(aboutString.includes(aboutArray)){
              checkAbout=true
            }
          }


          if(checkAbout){
            courseArray.push(courseObject[index])
          }
        }
        courseObject=courseArray
      }

      //filter by price
      if(priceString){
        let courseArray=[]
        for(let index=0;index<courseObject.length;index++){
          let price=Number(courseObject[index].price)
          if(priceString.toString()==='<200'){
            if(price<200000){
              courseArray.push(courseObject[index])
            }
          }
          else if(priceString.toString()==='200<<500'){
            if(price>=200000&&price<=500000){
              courseArray.push(courseObject[index])
            }
          }
          else{
            if(price>500000){
              courseArray.push(courseObject[index])
            }
          }
        }
        courseObject=courseArray
      }

      res.status(200).render("home", { courseObject });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new HomeController();
