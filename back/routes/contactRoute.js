const express = require("express");
const routes = express.Router();
const {getContact, createContact, getOneContact, updateRead} = require('../controllers/contactController');
  
routes.get('/contact', getContact);
routes.get('/contact/:id', getOneContact);
routes.post('/contact', createContact);
routes.put('/contact/:id', updateRead);

module.exports = routes;
