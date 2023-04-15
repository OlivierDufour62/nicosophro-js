const express = require("express");
const routes = express.Router();
const {getUser, createUser, getOneUser, updateUser} = require('../controllers/userController');
  
routes.get('/user', getUser);
routes.get('/user/:id', getOneUser);
routes.post('/user', createUser);
routes.put('/user/:id', updateUser);

module.exports = routes;