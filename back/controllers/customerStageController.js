const Customer = require("../models/customerModel");
const Stage = require("../models/stageModel");
const CustomerStage = require("../models/CustomerStageModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createStaged = async (req, res, err) => {
  const newStaged = new CustomerStage({
    customer_id: req.body.customer_id,
    stage_id: req.body.stage_id,
  });
  newStaged
    .save()
    .then(() => {
      res.status(201).json({ message: "Étape du client enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la sauvegarde de l'étape du client" });
    });
};

exports.getStaged = async (req, res, err) => {
    try {
      const customerStage = await CustomerStage.find();
      const stageWithCustomers = await Promise.all(customerStage.map(async (cs)  => {

          if(ObjectId.isValid(cs.customer_id) && ObjectId.isValid(cs.stage_id)){
              const customer = await Customer.findById(cs.customer_id);
              const stage = await Stage.findById(cs.stage_id);
              return {...cs._doc, customer, stage};
          }
          
          return cs;
      }));
      res.status(200).json(stageWithCustomers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.getOneStaged = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid Customer id" });
      }
      const customerStage = await CustomerStage.findById(id);
      if (!customerStage) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if(Array.isArray(customerStage)){
        const stageWithCustomer = await Promise.all(customerStage.map(async (cs) => {

          if (ObjectId.isValid(cs.customer_id) && ObjectId.isValid(cs.stage_id)){
            const customer = await Customer.findById(cs.customer_id);
            const stage = await Stage.findById(cs.stage_id);

            return {...cs._doc, customer, stage};

          }
          return cs;

        }));

        res.status(200).json(stageWithCustomer);
      } else {
        if (ObjectId.isValid(customerStage.customer_id) && ObjectId.isValid(customerStage.stage_id)) {

          const customer = await Customer.findById(customerStage.customer_id);
          const stage = await Stage.findById(customerStage.stage_id);
          const stageWithCustomer = {...customerStage._doc, customer, stage};

          res.status(200).json(stageWithCustomer);

        } else {

          res.status(404).json({ message: "Appointment not found" });

        }
      }
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
