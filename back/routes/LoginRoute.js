const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

const router = express.Router();
const secret = process.env.JWT_SECRET;
console.log("JWT Secret:", secret);

// Route de connexion
router.post("/login", async (req, res) => {
  const { user_mail, user_password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ user_mail });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Création du payload
    const payload = {
      user_id: user._id,
      user_mail: user.user_mail, // Ajoute d'autres propriétés du modèle User si nécessaire
    };

    // Création du token JWT
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    console.log("Token:", token);

    // Renvoi du token JWT en tant que réponse
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});

module.exports = router;
