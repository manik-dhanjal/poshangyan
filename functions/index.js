const functions = require('firebase-functions');
// const {admin,db} = require('./util/admin');
const express = require('express');
const app = express();
 
var cors = require('cors')
app.use(cors());
 
app.get('/as',(req,res)=>{
    res.send({message:"Working"});
})

exports.api = functions.https.onRequest(app);






