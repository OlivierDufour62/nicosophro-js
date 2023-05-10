const express = require("express");
const routes = express.Router();
const { authenticate } = require('../controllers/auth'); // Importez le middleware checkJwt depuis le fichier approprié

const { getAppointment, createAppointment, getOneAppointment, updateAppointment } = require('../controllers/appointmentController');

routes.get('/appointment', getAppointment);
routes.get('/appointment/:id', authenticate, getOneAppointment);
routes.post('/appointment', authenticate, createAppointment);
routes.put('/appointment/:id', authenticate, updateAppointment);

module.exports = routes;
