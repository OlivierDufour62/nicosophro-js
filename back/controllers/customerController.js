const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createCustomer = async (req, res, err) => {
  const newCustomer = new Customer({
    lastname: req.body.customer_lastname,
    firstname: req.body.customer_firstname,
    email: req.body.customer_email,
    address: req.body.customer_address,
    zipcode: req.body.customer_zipcode,
    city: req.body.customer_city,
    phone: req.body.customer_phone,
    date_birthday: req.body.customer_date_birthday,
  });

  newCustomer
    .save()
    .then(() => {
      res.status(201).json({ message: "Client enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la sauvegarde du client" });
    });
};

exports.getCustomer = async (req, res, err) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Customer id" });
    }
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Customer id" });
    }

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);

    await Customer.findByIdAndUpdate(id, {
      lastname: req.body.customer_lastname,
      firstname: req.body.customer_firstname,
      email: req.body.customer_email,
      address: req.body.customer_address,
      zipcode: req.body.customer_zipcode,
      city: req.body.customer_city,
      phone: req.body.customer_phone,
      date_birthday: req.body.customer_date_birthday,
      date_update: Date.now()
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
