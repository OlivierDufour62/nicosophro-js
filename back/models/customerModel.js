const mongoose = require("mongoose");
var validate = require('mongoose-validator')

const customerSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Le nom de famille ne doit contenir que des lettres.",
    },
    minlength: 3,
    maxlength: 30,
  },
  firstname: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^([a-zA-ZÀ-ÿ]+[- ']?)+[a-zA-ZÀ-ÿ]+$/.test(value);
      },
      message: "Le prenom ne doit contenir que des lettres.",
    },
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "L'adresse email n'est pas valide",
    },
    minlength: 3,
    maxlength: 64,
  },
  address: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9\s,'-]*$/.test(value);
      },
      message: "L'adresse n'est pas valide",
    },
    minlength: 6,
    maxlength: 60,
  },
  zipcode: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^(?:[0-8]\d|9[0-8])\d{3}$/.test(value);
      },
      message: 'Le code postal est invalide.'
    },
    minlength: 3,
    maxlength: 30
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "La ville ne doit contenir que des lettres.",
    },
    minlength: 3,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(value);
      },
      message: "La ville ne doit contenir que des lettres.",
    },
    minlength: 3,
    maxlength: 20,
  },
  date_birthday: {
    type: Date,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
