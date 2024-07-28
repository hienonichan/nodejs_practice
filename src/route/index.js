
//express.Router()
const homeRouter=require('./home')
const courseRouter=require('./course')
const authRouter=require('./auth')
const cartsRouter=require('./shopping-carts')
const adminRouter=require('./admin')
const orderRouter=require('./order')
const settingsRouter=require('./settings')

//middleware

const checkToken=require('../middleware/checkToken')
const errHandler=require('../middleware/errHandler')
const getUser=require('../middleware/getUser')
const checkAdmin=require('../middleware/checkAdmin')

function route(app){
    app.use(errHandler)
    app.use('/auth',authRouter)
    app.use(checkToken)
    app.use(getUser)
    app.use('/course',courseRouter)
    app.use('/settings',settingsRouter)
    app.use('/shopping-carts',cartsRouter)
    app.use('/home',homeRouter)
    app.use('/admin',checkAdmin,adminRouter)
    app.use('/order',orderRouter)
    //config for not route fixing
    // app.use('/',(req,res,next)=>{
    //     res.status(404).send('<h1>PAGE NOT FOUND</h1>')
    // })
}
module.exports=route
