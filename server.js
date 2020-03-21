const express = require('express');
const body_parser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'andrei98',
      database : 'smart_brain'
    }
  });




app.use(cors());
app.use(body_parser.json());
const database={
users:[
    {
        id: '123',
        name: 'Andrei',
        email:'andrei@gmail.com',
        password: 'pizza',
        entries: 0,
        joined:new Date()

    },
    {
        id: '124',
        name: 'Sally',
        email:'sally@gmail.com',
        password: 'cookies',
        entries: 0,
        joined:new Date()

    },
],
login:[
    {
        id:'987',
        hasj:'',
        email:'andrei@gmail.com'
    }
]
}

app.get('/',(req, res)=>{
    res.json('it is working');
})

app.post('/signin',(req, res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db,bcrypt)});
app.post('/imageurl',(req,res)=>{image.handleApi(req,res)})

app.get('/profile/:id',(req,res)=>{profile.getProfile(req,res,db) });


app.listen(process.env.PORT ||3001, ()=>{
    console.log(`App is running on port ${process.env.PORT}`);
})




/*

/ --> this is running
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT = updated user
*/