const express = require("express");
const routes = require("./routes/ContactRoute");
const routesUser = require("./routes/UserRoute");
const routesCustomer = require("./routes/CustomerRoute");
const routesStage = require("./routes/StageRoute");
const routesAppointment = require("./routes/AppointmentRoute");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose"); // importez le module mongoose

const app = express();
const port = process.env.PORT || 8000;

// Connectez-vous à MongoDB
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

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);
app.use(routesUser);
app.use(routesCustomer);
app.use(routesStage);
app.use(routesAppointment);

app.use((req, res) => {
  res.status(404);
  res.json({
    error: "Page not found",
  });
});

app.listen(port, () => console.log(" listening on port " + port));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  //   res.status(500).send("Something broke!");
});
