const mongoose = require("mongoose");
var validate = require('mongoose-validator')


const protocolSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  stage_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stage",
  }],
  exercises: [{
    exercise_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    intention: {
      type: String,
      maxLength: 255,
    }
  }],
  sophronization:  [{
    sophro_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sophronization",
    },
    intention: {
      type: String,
      maxLength: 255,
    }
  }],
  duration: {
    type: mongoose.Schema.Types.Number,
    validate: {
      validator: function (value) {
        return value >= 0 && Number.isInteger(value);
      },
      message: "La durée doit être un nombre entier positif",
    },
    required: true,
  },
  desc: {
    type: String,
    lenght: 255,
    required: true,
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

module.exports = mongoose.model("Protocol", protocolSchema);