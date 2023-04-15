const Appointment = require("../models/appointmentModel");
const Customer = require("../models/customerModel")
const Stage = require("../models/stageModel")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createAppointment = async (req, res, err) => {
  const newAppointment = new Appointment({
    customer_id: req.body.customer_id,
    stage_id: req.body.stage_id,
    date_appointment: req.body.date_appointment,
  });

  newAppointment
    .save()
    .then(() => {
      res.status(201).json({ message: "Rendez vous enregistré avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la sauvegarde du rendez vous" });
    });
};

exports.getAppointment = async (req, res, err) => {
    try {
      const appointment = await Appointment.find();
      const appointmentWithCustomers = await Promise.all(appointment.map(async (app)  => {

          if(ObjectId.isValid(app.customer_id) && ObjectId.isValid(app.stage_id)){
              const customer = await Customer.findById(app.customer_id);
              const stage = await Stage.findById(app.stage_id);
              return {...app._doc, customer, stage};
          }
          
          return app;
      }));
      res.status(200).json(appointmentWithCustomers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.getOneAppointment = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid Customer id" });
      }
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if(Array.isArray(appointment)){
        const appointmentWithCustomers = await Promise.all(appointment.map(async (app) => {

          if (ObjectId.isValid(app.customer_id) && ObjectId.isValid(app.stage_id)){
            const customer = await Customer.findById(app.customer_id);
            const stage = await Stage.findById(app.stage_id);

            return {...app._doc, customer, stage};

          }
          return app;

        }))

        res.status(200).json(appointmentWithCustomers);
      } else {
        if (ObjectId.isValid(appointment.customer_id) && ObjectId.isValid(appointment.stage_id)) {

          const customer = await Customer.findById(appointment.customer_id);
          const stage = await Stage.findById(appointment.stage_id);
          const appointmentWithCustomers = {...appointment._doc, customer, stage};

          res.status(200).json(appointmentWithCustomers);

        } else {

          res.status(404).json({ message: "Appointment not found" });

        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid appointment id" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }
    res.status(200).json(appointment);

    await Appointment.findByIdAndUpdate(id, {
      date_appointment: req.body.date_appointment,
      date_update: Date.now(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
