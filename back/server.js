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

// Protection des routes avec JWT
const secret = process.env.JWT_SECRET;

// Middleware de vérification du token JWT
const checkJwt = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

// Routes publiques (non protégées)
app.use("/public", routes);
app.use(loginRoute);
// Routes protégées
app.use("/user", checkJwt, routesUser);
app.use("/customer", checkJwt, routesCustomer);
app.use("/stage", checkJwt, routesStage);
app.use("/appointment", checkJwt, routesAppointment);
app.use("/exercise", checkJwt, routesExercise);
app.use("/protocol", checkJwt, routesProtocol);

app.use((req, res) => {
  res.status(404);
  res.json({
    error: "Page not found",
  });
});

app.listen(port, () => console.log("listening on port " + port));
