const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  stage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stage",
    required: true,
  },
  date_appointment: {
    type: Date,
    required: true,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);