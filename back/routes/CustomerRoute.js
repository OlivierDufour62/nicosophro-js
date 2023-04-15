const express = require("express");
const routes = express.Router();
const {createCustomer, getCustomer, getOneCustomer, updateCustomer} = require('../controllers/customerController');
  
routes.get('/customer', getCustomer);
routes.get('/customer/:id', getOneCustomer);
routes.post('/customer', createCustomer);
routes.put('/customer/:id', updateCustomer);

module.exports = routes;