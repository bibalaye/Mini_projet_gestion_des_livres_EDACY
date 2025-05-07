const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Format de token invalide' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      req.user = { userId: user.id };
      req.token = token;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token invalide' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ message: 'Erreur d\'authentification' });
  }
};

module.exports = auth; 