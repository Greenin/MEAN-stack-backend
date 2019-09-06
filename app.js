'use strict'

var oExpress = require('express'); //To load the "express" module
var oBodyParser = require('body-parser');

var oApp = oExpress();

//To load route files
var oProjectRoutes = require('./routes/project');

//Middlewares
oApp.use(oBodyParser.urlencoded({extended:false})); //It is simply a configuration for body-parser
oApp.use(oBodyParser.json()); //So that everything that arrives to body-parser converts it to JSON


// To set headers y cors
// This will always be executed before each request
oApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Routes
oApp.use('/api',oProjectRoutes);


//Routes
/*
oApp.get('/',(req,res) => {
	res.status(200).send(
		"<h1>Homepage</h1>"
	);
});

oApp.post('/test/:id',(req,res) => {
	console.log(req.body.name);
	console.log(req.query.web);
	console.log(req.params.id);

	res.status(200).send({
		message: "Hello world from my NodeJS API"
	});
});
*/

//To export
module.exports = oApp;