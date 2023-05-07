const express = require("express");
const router = express.Router();
const { createCustomer, getCustomer, getOneCustomer, updateCustomer } = require('../controllers/customerController');
const checkJwt = require('express-jwt');

// Routes publiques (non protégées)
router.get('/customer', getCustomer);
router.get('/customer/:id', getOneCustomer);

// Routes protégées
router.post('/customer', checkJwt, createCustomer);
router.put('/customer/:id', checkJwt, updateCustomer);

module.exports = router;
