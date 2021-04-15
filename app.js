'use strict';
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const uriMongo = 'mongodb://127.0.0.1:27017/crud';
const port = process.env.port || 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+'/assets/'))

app.set('view engine','ejs');
app.set('views', __dirname+'/assets/views');

mongodb.connect(uriMongo,{useUnifiedTopology:true},(err,res)=>{
    if(err)return console.error(err);
    console.log('Banco de dados Mongo conectado');
})

app.get('/',(req,res)=>{
    res.render('index.ejs',{title:'Home'})
})

app.get('/create',(req,res)=>{
    res.render('create.ejs',{title:'Create'})
})
app.get('/read',(req,res)=>{
    res.render('read.ejs',{title:'Read'})
})
app.get('/update',(req,res)=>{
    res.render('update.ejs',{title:'Update'})
})
app.get('/delete',(req,res)=>{
    res.render('delete.ejs',{title:'Delete'})
})




app.listen(port, (req,res)=>console.log('Servidor Node rodando'));