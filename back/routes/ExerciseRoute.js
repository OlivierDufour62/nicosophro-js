const express = require("express");
const routes = express.Router();
const { createExercise, getExercise, getOneExercise} = require('../controllers/exerciseController');
  
routes.get('/exercise', getExercise);
routes.get('/exercise/:id', getOneExercise);
routes.post('/exercise', createExercise);
// routes.put('/appointment/:id', updateAppointment);

module.exports = routes;
