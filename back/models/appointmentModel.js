const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  etape_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etape",
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
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
