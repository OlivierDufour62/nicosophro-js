const express = require("express");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createUser = async (req, res, err) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.user_password, salt);
  const newUser = new Users({
    user_role: req.body.user_role,
    user_name: req.body.user_name,
    user_firstname: req.body.user_firstname,
    user_mail: req.body.user_mail,
    user_password: hash,
    user_tel: req.body.user_tel,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la sauvegarde de l'utilisateur" });
    });
};

exports.getUser = async (req, res, err) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid User id" });
    }
    const User = await Users.findById(id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid User id" });
    }

    const User = await User.findById(id);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(User);

    await User.findByIdAndUpdate(id, {
      read: true,
      date_read: Date.now(),
    });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
