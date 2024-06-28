
//express.Router()
const homeRouter=require('./home')
const courseRouter=require('./course')
const managerRouter=require('./manager')
const authRouter=require('./auth')


//middleware

const checkToken=require('../middleware/checkToken')

function route(app){
    app.use('/auth',authRouter)

    
    app.use(checkToken)
    app.use('/course',courseRouter)
    app.use('/home',homeRouter)
    app.use('/manager',managerRouter)
}
module.exports=route
