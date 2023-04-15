const express = require("express");
const routes = express.Router();
const { createStaged, getStaged, getOneStaged} = require('../controllers/customerStageController');
  
routes.get('/customerstage', getStaged);
routes.get('/customerstage/:id', getOneStaged);
routes.post('/customerstage', createStaged);
// routes.put('/appointment/:id', updateAppointment);

module.exports = routes;
