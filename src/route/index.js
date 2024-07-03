
//express.Router()
const homeRouter=require('./home')
const courseRouter=require('./course')
const managerRouter=require('./manager')
const authRouter=require('./auth')


//middleware

const checkToken=require('../middleware/checkToken')
const errHandler=require('../middleware/errHandler')
const checkAdmin=require('../middleware/checkAdmin')

function route(app){
    app.use(errHandler)
    app.use('/auth',authRouter)
    app.use(checkToken)
    app.use('/course',checkAdmin,courseRouter)
    app.use('/home',homeRouter)
    app.use('/manager',checkAdmin,managerRouter)
}
module.exports=route
