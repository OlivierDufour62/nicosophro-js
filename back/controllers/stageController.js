const Stage = require("../models/stageModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createStage = async (req, res, err) => {
  const newStage = new Stage({
    num: req.body.stage_num,
  });

  newStage
    .save()
    .then(() => {
      res.status(201).json({ message: "Étape enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la sauvegarde du étape" });
    });
};

exports.getStage = async (req, res, err) => {
  try {
    const stage = await Stage.find();
    res.status(200).json(stage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneStage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Customer id" });
    }
    const stage = await Stage.findById(id);
    if (!stage) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(stage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid stage id" });
    }

    const stage = await Stage.findById(id);

    if (!stage) {
      return res.status(404).json({ message: "stage not found" });
    }
    res.status(200).json(stage);

    await Stage.findByIdAndUpdate(id, {
      num: req.body.stage_num,
      date_update: Date.now(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
