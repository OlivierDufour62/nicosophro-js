const mongoose = require("mongoose");

const etapeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  num: {
    type: Number,
    lenght: 5,
    required: true,
  },
  nametype: {
    type: String,
    lenght: 30,
    required: true,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date,
    default: Date.now,
  },
});

const Etape = mongoose.model("Etape", etapeSchema);
