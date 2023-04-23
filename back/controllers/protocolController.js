const Protocol = require("../models/protocolModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createProtocol = async (req, res, err) => {
  try {
    const newProtocol = new Protocol({
      customer_id: req.body.customer_id,
      stage_id: req.body.stage_id,
      exercises: req.body.exercises,
      sophronization: req.body.sophronization,
      duration: req.body.duration,
      desc: req.body.desc,
    });

    const savedProtocol = await newProtocol.save();
    res.json(savedProtocol);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating protocol");
  }
};

exports.getProtocol = async (req, res, err) => {
  try {
    const protocol = await Protocol.find().populate([
        { path: "customer_id" },
        { path: "stage_id" },
        { path: "exercises.exercise_id" },
      ]);;
    res.status(200).json(protocol);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneProtocol = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Customer id" });
    }
    const protocol = await Protocol.findById(id).populate([
        { path: "customer_id" },
        { path: "stage_id" },
        { path: "exercises.exercise_id" },
      ]);
    if (!protocol) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(protocol);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProtocol = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Customer id" });
    }

    const protocol = await Protocol.findById(id);

    if (!protocol) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(protocol);

    await Prtotocol.findByIdAndUpdate(id, {
      customer_id: req.body.customer_id,
      stage_id: req.body.stage_id,
      exercises: req.body.exercises,
      sophronization: req.body.sophronization,
      duration: req.body.duration,
      desc: req.body.desc,
      date_update: Date.now(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
