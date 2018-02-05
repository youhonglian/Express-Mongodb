const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const model = require('../models/model')
const Demo = model.Demo
mongoose.connect('mongodb://localhost:27017/express_demo')
router.get('/add',(req,res,next) =>{
  res.render('add',{
    title:'ExpressMongod示例-新增'
  })
})
router.post('/add',(req,res,next) =>{
  // console.log(req.body)
  let demo = new Demo({
    //body-parser
    uid:req.body.uid,
    title:req.body.title,
    content:req.body.content
  })
  demo.save(function(err,doc){
    res.redirect('/')
  })

})
//U
router.get('/update',(req,res,next) => {
  //  更新的记录在哪？找出来  记录就是一个json对象  保存
  var id = req.query.id;
  console.log(id);
  if(id && id !=''){
    Demo.findById(id,function(err,doc){
      res.render('update',{
        title:'修改数据',
        demo:doc
      })
    })
  }
})
router.post('/update',(req,res,next) => {
  //  更新的记录在哪？找出来  记录就是一个json对象  保存
  let demo = {
    uid:req.body.uid,
    title:req.body.title,
    content:req.body.content
  }
  let id = req.body.id
  if(id&&id!=''){
    console.log('============update id=' +id)
    Demo.findByIdAndUpdate(id,demo,(err,doc) => {
      console.log(doc)
      res.redirect('/');
    })
  }
})

router.get('/del',(req,res,next) => {
  // ?id=11111&name=ddfdf queryStr 查询字符串
  var id = req.query.id
  if(id&& id!=''){
    Demo.findByIdAndRemove(id,(err,doc) => {
      res.redirect('/')
    })
  }
})


router.get('/',(req,res,next) =>{
  Demo.find((err,docs) =>{
    console.log(docs);
    res.render('index',{
      title:'ExpressMongod示例',
      demos:docs
    })
  })
  // let docs = [
  //   {
  //     id:'121212',
  //     uid:'4321234',
  //     title:'白百合了吗？',
  //     content:'不好说',
  //     createTime:'2017-4-10'
  //   }
  // ]

})
module.exports = router
