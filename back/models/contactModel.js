const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "L'adresse email n'est pas valide",
    },
    minlength: 3,
    maxlength: 64,
  },
  content: {
    type: String,
    lenght: 255,
    required: true,
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
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_read: {
    type: Date,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
