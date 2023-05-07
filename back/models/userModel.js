const mongoose = require("mongoose");
const validate = require('mongoose-validator')

const userSchema = new mongoose.Schema({
  user_role: {
    type: Number,
    lenght: 20,
    required: true,
  },
  user_name: {
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
  user_firstname: {
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
  user_mail: {
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
  user_password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(value);
      },
      message: "Mot de passe invalide",
    },
    minlength: 3,
    maxlength: 64,
  },
  user_tel: {
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
});

module.exports = mongoose.model("User", userSchema);

