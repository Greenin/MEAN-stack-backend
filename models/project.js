'use strict'


var oMongoose = require('mongoose');
var oSchema = oMongoose.Schema;

var oProjectSchema = oSchema({
	name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String
});

module.exports = oMongoose.model('Project',oProjectSchema); //It will save the objects in the model "projects"(wiht "s" although it is written "Project", Mongoose works on this way)