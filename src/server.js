const express=require('express')
const app=express()
const hbs=require('express-handlebars')
const path=require('path')
const route=require('./route/index')
const database=require('./config/db')
const methodOverride=require('method-override')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')



//config dotenv
dotenv.config()
const PORT=process.env.port||3000

//config method-override
app.use(methodOverride('_method'))

//config cookie-parser
app.use(cookieParser())

//config static file
app.use(express.static(path.join(__dirname,'public')))

// middleware parse data
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// config handlebars
app.engine('handlebars',hbs.engine())
app.set('view engine','handlebars')
app.set('views',path.join(__dirname,'resources','views'))

//config database
database()

// config route
route(app)
app.listen(PORT,()=>{
    console.log('server is running on http://localhost:'+PORT+'/home')
})