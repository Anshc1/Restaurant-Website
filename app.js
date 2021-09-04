const express = require('express')
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

main().catch(err => console.log(err));

const port = 3000
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
var kittySchema = new mongoose.Schema({
  name : {
    type: String
  },
  phone : {
    type: String
  },
  address: {
    type: String
  },
  fooditems: {
    type: String

  },
  quantity:{
    type: Number
  }
},{versionKey:false});
var Contact = mongoose.model('Contact', kittySchema);
app.use(express.static('static'))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

app.get('/home', function (req, res) {
    const params ={ }
    res.status(200).render('home.pug', {params})
  })
app.get('/about', function (req, res) {
    const params ={ }
    res.status(200).render('about.pug', {params})
})
app.get('/menu', function (req, res) {
  const params ={ }
  res.status(200).render('menu.pug', {params})
})
app.get('/order', function (req, res) {
    res.status(200).render('order.pug')
})
app.post('/order', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send("Order Confirmed")
  }).catch(()=>{
  res.status(400).send("System Error")
})})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`)
})