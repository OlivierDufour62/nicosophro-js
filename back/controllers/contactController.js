const express = require("express");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createContact = async (req, res, err) => {
  const newContact = new Contact({
    lastname: req.body.contact_lastname,
    firstname: req.body.contact_firstname,
    email: req.body.contact_email,
    content: req.body.contact_content,
    phone: req.body.contact_phone,
  });

  newContact
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

exports.getContact = async (req, res, err) => {
  try {
    const contacts = Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid contact id" });
    }
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRead = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid contact id" });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);

    await Contact.findByIdAndUpdate(id, {
      read: true,
      date_read: Date.now(),
    });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
