const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Étape"
  },
  num: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return /\d{1,2}/.test(value);
      },
      message: "Name type invalide",
    },
    minlength: 1,
    maxlength: 5,
  },
  nametype: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9\s,'-]*$/.test(value);
      },
      message: "Name type invalide",
    },
    minlength: 6,
    maxlength: 60,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date,
  },
});

module.exports = mongoose.model("Stage", stageSchema);
