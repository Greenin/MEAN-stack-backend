'use strict'

var oProject = require('../models/project');
var oFs = require('fs');
var path = require('path');

var oJsonController = {
	
	home: function(req, res){
		return res.status(200).send({
			message: 'I am home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "I am controller test method of project"
		});
	},

	saveProject: function(req,res){
		var oAuxProject = new oProject();

		var oParams = req.body;
		oAuxProject.name = oParams.name;
		oAuxProject.description = oParams.description;
		oAuxProject.category = oParams.category;
		oAuxProject.year = oParams.year;
		oAuxProject.langs = oParams.langs;
		oAuxProject.image = null;

		oAuxProject.save((err,bProjectStored) => {
			if (err) return res.status(500).send({message: 'Error in the save operation.'});

			if (!bProjectStored) return res.status(404).send({message: 'Project not saved.'});

			return res.status(200).send({project: bProjectStored});
		});

		/*
		return res.status(200).send({
			project: oAuxProject,
			message: "saveProject method"
		});
		*/
	},

	getProject: function(req,res){
		var oProjectId = req.params.id;
console.log(oProjectId);
		if (oProjectId == null)	return res.status(404).send({message: 'Project does not exist.'});
console.log("trace1");		

		oProject.findById(oProjectId, (err, oProjectFound) => {
console.log("trace2");	
			if (err) return res.status(500).send({message: 'Error returning data.'});
console.log("trace3");	
			if (!oProjectFound) return res.status(404).send({message: 'Project does not exist.'});
console.log("trace4");	
			return res.status(200).send({
				oProjectFound
			})
		});

	},



	getProjects: function(req,res){

		oProject.find({}).sort('year').exec((err,aProjects) => {

			if (err) return res.status(500).send({message: 'Error returning data.'})

			if (!aProjects) return res.status(404).send({message: 'There are not projects to show'})

			return res.status(200).send({aProjects});
		});

	},



	updateProject: function(req,res){
		var oProjectId = req.params.id;
		var oUpdate = req.body;

		oProject.findByIdAndUpdate(oProjectId,oUpdate,{new: true},(err,oProjectUpdated)=>{
			if (err) return res.status(500).send({message: 'Error updating the project'});

			if (!oProjectUpdated) return res.status(404).send({message: 'Project to update does not exist'});

			return res.status(200).send({
				project: oProjectUpdated
			})
		});
	},


	deleteProject: function(req,res){
		var oProjectId = req.params.id;

		oProject.findByIdAndRemove(oProjectId, (err,oProjectDeleted) => {
			if (err) return res.status(500).send({message:'Error deleting the project'});

			if (!oProjectDeleted) return res.status(404).send({message: "Project to delete does not exist."});

			return res.status(200).send({
				project: oProjectDeleted
			})
		});
	},


	uploadImage: function(req,res){
		var oProjectId = req.params.id;
		var sFileName = 'Image not uploaded ...';

		if (req.files){
			var sFilePath = req.files.Image.path;
			var aFileSplit = sFilePath.split('\\');
			sFileName = aFileSplit[1];
			var aExtSplit = sFileName.split('\.');
			var sFileExt = aExtSplit[1];

			if(sFileExt == 'png' || sFileExt == 'jpg' || sFileExt == 'jpeg' || sFileExt == 'gif'){
				oProject.findByIdAndUpdate(oProjectId,{image: sFileName}, {new: true}, (err,oProjectUpdated) =>{
					if(err)	return res.status(500).send({message: 'Error updating image'});

					if(!oProjectUpdated) return res.status(404).send({message: 'Project does not exist. Image not uploaded.'});

					return res.status(200).send({
						project: oProjectUpdated
					});
				});
			}
			else
			{
				oFs.unlink(sFilePath,(err) => {
					return res.status(200).send({message: 'File extension is not valid'});
				});
			}


			//console.log(req.files);

		}
		else
		{
			return res.status(200).send({
				message: sFileName
			});
		}

	},


	getImageFile: function(req,res){
		var sFile = req.params.image;
		var sFilePath = './uploads/'+sFile;

		oFs.exists(sFilePath,(exists) => {
			if (exists){
				return res.sendFile(path.resolve(sFilePath));
			}else{
				return res.status(200).send({
					message: "Image does not exist ..."
				});
			}
		});
	}

};


module.exports = oJsonController;