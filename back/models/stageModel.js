const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Étape"
  },
  num: {
    type: Number,
    lenght: 5,
    required: true,
  },
  nametype: {
    type: String,
    lenght: 30,
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
