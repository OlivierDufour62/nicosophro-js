const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const loginRoute = require("./routes/LoginRoute");
const routes = require("./routes/ContactRoute");
const routesUser = require("./routes/UserRoute");
const routesCustomer = require("./routes/CustomerRoute");
const routesStage = require("./routes/StageRoute");
const routesAppointment = require("./routes/AppointmentRoute");
const routesExercise = require("./routes/ExerciseRoute");
const routesProtocol = require("./routes/ProtocolRoute");
const { authenticate } = require('./controllers/auth');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect("mongodb://localhost:27017/nicodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion réussie à MongoDB");
  })
  .catch((err) => {
    console.log("Erreur lors de la connexion à MongoDB : " + err);
  });

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes publiques (non protégées)
app.use("/public", routes);
app.use(loginRoute);
// Routes protégées
app.use("/api",authenticate, routesUser);
app.use("/api",authenticate,routesCustomer);
app.use("/api",authenticate, routesStage);
app.use("/api",authenticate, routesAppointment);
app.use("/api",authenticate, routesExercise);
app.use("/api",authenticate, routesProtocol);

app.use((req, res) => {
  res.status(404);
  res.json({
    error: "Page not found",
  });
});

app.listen(port, () => console.log("listening on port " + port));
