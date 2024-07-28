const multer=require('multer')
const path=require('path')
//config multer
const storage = multer.diskStorage({
    // config saved folder
    destination: (req, file, cb) => {
      cb(null,path.join(__dirname,'../','public','img')); 
    },
    //config file name
    filename: (req, file, cb) => {
      console.log(req.body)
      cb(null,req.body.username+path.extname(file.originalname))
    }
});

const upload=multer({storage:storage})
module.exports=upload