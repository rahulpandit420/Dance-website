const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodypaser = require("body-parser")
mongoose.connect('mongodb://localhost/contactdance');
const port = 8000;

//define schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

var contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved")
    }).catch(()=>{
        res.status(400).send("item was not saved the data")
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
