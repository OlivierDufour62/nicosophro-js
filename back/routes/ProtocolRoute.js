const express = require("express");
const routes = express.Router();
const {getProtocol, createProtocol, getOneProtocol, updateProtocol} = require('../controllers/protocolController');
  
routes.get('/protocol', getProtocol);
routes.get('/protocol/:id', getOneProtocol);
routes.post('/protocol', createProtocol);
routes.put('/protocol/:id', updateProtocol);

module.exports = routes;
