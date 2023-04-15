const express = require("express");
const routes = express.Router();
const {getAppointment, createAppointment, getOneAppointment, updateAppointment} = require('../controllers/appointmentController');
  
routes.get('/appointment', getAppointment);
routes.get('/appointment/:id', getOneAppointment);
routes.post('/appointment', createAppointment);
routes.put('/appointment/:id', updateAppointment);

module.exports = routes;
