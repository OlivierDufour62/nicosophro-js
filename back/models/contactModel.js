const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  lastname: {
    type: String,
    lenght: 30,
    required: true,
  },
  firstname: {
    type: String,
    lenght: 30,
    required: true,
  },
  email: {
    type: String,
    lenght: 60,
    required: true,
  },
  content: {
    type: String,
    lenght: 255,
    required: true,
  },
  phone: {
    type: String,
    lenght: 20,
    required: true,
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
