'use strict';
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const uriMongo = 'mongodb://127.0.0.1:27017/crud';
const port = process.env.port || 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/assets/'))

app.set('view engine','ejs');
app.set('views', __dirname+'/assets/views');

mongodb.connect(uriMongo,{useUnifiedTopology:true},(err,res)=>{
    if(err)return console.error(err);
    console.log('Banco de dados Mongo conectado');
    let db = res.db('crud');
    let users = db.collection('users');

    app.get('/',async(req,res)=>{
        users.deleteMany({});
        res.render('index.ejs',{title:'Home'})
    })
    // GETS
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
     
    //SETS
    app.post('/create',(req,res)=>{
        try {
            let data = req.body;
            db.collection('users').insertOne(data);
            res.json({status:'ok'});
        } catch (error) {
            res.json({status:'bad',error: error});
        }
    })
    app.post('/read',(req,res)=>{

    })
    app.post('/update',(req,res)=>{

    })
    app.post('/delete',(req,res)=>{

    })
    

    app.listen(port, (req,res)=>console.log('Servidor Node rodando'));

})

const callBackinsert = (db)=>{

}



