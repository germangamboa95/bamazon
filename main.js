const express = require('express');
const bodyParser = require('body-parser').json(); 
const path = require('path');
const customer = require('./controllers/customer.js');
const app = express(); 

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile('./app/index.html');
});

app.use('/client/', customer);


//  Error Catcher
app.use(function(error, req, res, next) {
    console.log(error);
    res.json({ message: error });
  });
  

//  Init Server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) throw err; 
    console.log("server is starting..")
});