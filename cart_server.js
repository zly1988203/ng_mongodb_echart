var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var url='mongodb://localhost:27017/cart';
var db=mongoose.connect(url);
mongoose.Promise = global.Promise;
require('./models/cart_model.js');
// set some resource
var app=express();
app.engine('.html',require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','html');

//Note the need to use two kinds of analytical methods, receiving less than the value in case the background
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./cart_routes')(app);
// listen port
app.listen(3001);

console.log('App running...');
