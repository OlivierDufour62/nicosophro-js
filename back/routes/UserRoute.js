const express = require("express");
const routes = express.Router();
const User = require('../models/userModel');

// // const sqlite3 = require("sqlite3").verbose();
// // const db = new sqlite3.Database("./data/sqlite/nicodb.db");

module.exports = routes;

routes.get('/home', (req, res) => {
  res.json('coucou');
});


routes.post('/addusers', (req, res) => {
  const newUser = new User({
    user_role: req.body.user_role,
    user_name: req.body.user_name,
    user_firstname: req.body.user_firstname,
    user_mail: req.body.user_mail,
    user_password: req.body.user_password,
    user_tel: req.body.user_tel
  });
  
  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'utilisateur' });
    });
});

// routes.post('/contact', (req, res) => {
//   const newContact = new Contact({
//     contact_lastname: req.body.lastname,
//     contact_firstname: req.body.contact_firstname,
//     contact_email: req.body.contact_email,
//     contact_content: req.body.contact_content,
//     contact_phone: req.body.contact_phone
//   });
  
//   newContact.save()
//     .then(() => {
//       res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'utilisateur' });
//     });
// });