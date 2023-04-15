const express = require("express");
const routes = express.Router();
const { getStage, getOneStage, createStage, updateStage } = require('../controllers/stageController');
  
routes.get('/stage', getStage);
routes.get('/stage/:id', getOneStage);
routes.post('/stage', createStage);
routes.put('/stage/:id', updateStage);

module.exports = routes;