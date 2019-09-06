'use strict'

var mongoose = require('mongoose'); //require is a NodeJS function to load the "mongoose" package or library
var oApp = require('./app');
var nPort = 3700;

mongoose.Promise = global.Promise;  //To connect to the database
mongoose.connect('mongodb://localhost:27017/portfolio')
		.then(()=> {
			console.log("Connection to database established successfully ...");

			//Server creation
			oApp.listen(nPort, () => {
				console.log("Server running correctly in the url: localhost: 3700");
			});
		})
		.catch(err => console.log(err));
