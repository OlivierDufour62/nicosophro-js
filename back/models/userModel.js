const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_role: {
    type: Number,
    lenght: 20,
    required: true,
  },
  user_name: {
    type: String,
    lenght: 30,
    required: true,
  },
  user_firstname: {
    type: String,
    required: true,
  },
  user_mail: {
    type: String,
    lenght: 30,
    required: true,
  },
  user_password: {
    type: String,
    lenght: 30,
    required: true,
  },
  user_tel: {
    type: String,
    lenght: 20,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
