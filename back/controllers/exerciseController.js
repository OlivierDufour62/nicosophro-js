const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createExercise = async (req, res, err) => {
  const newExercise = new Exercise({
    name: req.body.name,
  });
  newExercise
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: "Exercice enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la sauvegarde de l'exercice" });
    });
};

exports.getExercise = async (req, res, err) => {
  try {
    const exercise = await Exercise.find();
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getOneExercise = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid exercice id" });
    }
    const exercise = await Exercise.findById(id);
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.updateAppointment = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) {
//       return res.status(404).json({ message: "Invalid appointment id" });
//     }

//     const appointment = await Appointment.findById(id);

//     if (!appointment) {
//       return res.status(404).json({ message: "appointment not found" });
//     }
//     res.status(200).json(appointment);

//     await Appointment.findByIdAndUpdate(id, {
//       date_appointment: req.body.date_appointment,
//       date_update: Date.now(),
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };
