//DEPENDENCIES
var express = require('express');
var bparser = require('body-parser');
var _ = require('underscore');



//SERVER SETUP
var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/data', function (req,res){
	data = require('./congresso.json');
	res.json(data);	
});


//ROUTES

















app.listen(PORT, function (){
	console.log("=== Listening on port: " + PORT + " ===");
	console.log(__dirname +"/public")
});