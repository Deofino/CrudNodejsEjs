'use strict';
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uriMongo = 'mongodb+srv://node1:33236882@teste.bkzkl.mongodb.net/node1';
const port = process.env.port || 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/assets/'))

app.set('view engine','ejs');
app.set('views', __dirname+'/assets/views');

mongodb.connect(uriMongo,{useUnifiedTopology:true},(err,res)=>{
    if(err)return console.error(err);
    console.log('Banco de dados Mongo conectado na porta '+port);
    let db = res.db('node1');
    let users = db.collection('users');

    app.get('/',async(req,res)=>{
        res.render('index.ejs',{title:'Home'})
    })
    // GETS
    app.get('/create',(req,res)=>{
        res.render('create.ejs',{title:'Create'})
    })
    app.get('/read',async(req,res)=>{
        let data = await users.find({}).toArray();
        res.render('read.ejs',{title:'Read',data: data})
    })
    app.get('/update',async(req,res)=>{
        let data = await users.find({}).toArray();
        res.render('update.ejs',{title:'Update',data: data})
    })
    app.get('/delete',async(req,res)=>{
        let data = await users.find({}).toArray();
        res.render('delete.ejs',{title:'Delete',data: data})
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
    app.get('/update/:id',async(req,res)=>{
        console.log(req.params);
        let user = await users.find(ObjectId(req.params.id)).toArray();
        console.log(user[0]);
        res.end()
    })
    app.post('/delete',(req,res)=>{

    })
    

    app.listen(port, (req,res)=>console.log('Servidor Node rodando'));

})

const callBackinsert = (db)=>{

}



