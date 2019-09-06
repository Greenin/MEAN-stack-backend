'use strict'

var oExpress = require('express');
var oProjectController = require('../controllers/project');

var oRouter = oExpress.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});


oRouter.get('/home',oProjectController.home);
oRouter.post('/test',oProjectController.test);
oRouter.post('/save-project',oProjectController.saveProject);
oRouter.get('/project/:id?',oProjectController.getProject);
oRouter.get('/project/:id',oProjectController.getProject);
oRouter.get('/projects',oProjectController.getProjects);
oRouter.put('/project/:id',oProjectController.updateProject);
oRouter.delete('/project/:id',oProjectController.deleteProject);
oRouter.post('/upload-image/:id', multipartMiddleware, oProjectController.uploadImage);
oRouter.get('/get-image/:image',oProjectController.getImageFile);

module.exports = oRouter;