const mongoose=require('mongoose')
async function connect(){
    try {
        mongoose.connect('mongodb://localhost:27017/nodejs_practice')
        console.log('connect database successfully!!')
    } catch (error) {
        console.log('connect database failed')
    }
}
module.exports=connect