const mongoose = require("mongoose");
const validate = require('mongoose-validator')

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
        validator: function (value) {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "Le nom de l\exercice ne doit contenir que des lettres.",
      },
      minlength: 3,
      maxlength: 30,
  },
  date_create: {
    type: Date,
    default: Date.now,
    required: true,
  },
  date_update: {
    type: Date,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
