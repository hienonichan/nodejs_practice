const mongoose = require("mongoose");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
class HomeController {
  // GET /home  //get all courses from all admins
  async show(req, res, next) {
    try {
      let searchName=req.query.name
      const course = await Course.find({})
      let courseObject = course.map((course) => course.toObject());
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
      //console.log(courseObject)
      res.status(200).render("home", { courseObject });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new HomeController();
