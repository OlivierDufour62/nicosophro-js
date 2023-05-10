const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decodedToken); // Ajout du log pour afficher les données du token décodé

    req.userData = decodedToken;
    next();
  } catch (error) {

    console.error('Token Error:', error); // Ajout du log pour afficher les erreurs de vérification du token
    return res.status(401).json({ message: 'Token invalide' });
  }
};
