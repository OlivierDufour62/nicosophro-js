const mongoose = require("mongoose");

const customerStageSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('customerStage', customerStageSchema);