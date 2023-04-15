const mongoose = require("mongoose");

const customerEtapeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('customerEtape', customerEtapeSchema);