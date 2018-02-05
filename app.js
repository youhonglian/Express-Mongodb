const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const indexRoute=require('./routes/index');

const app = express()
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:false
}))
app.use('/',indexRoute)
app.listen('3000',()=>{
  console.log('服务器启动了');
})
