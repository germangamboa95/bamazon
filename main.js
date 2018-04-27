const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const customer = require('./controllers/customer.js');
const manager = require('./controllers/manager.js');
const app = express(); 

app.use(express.static('app'))
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile('./app/index.html');
});

app.use('/client/', customer);

app.use('/manager/', manager);


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