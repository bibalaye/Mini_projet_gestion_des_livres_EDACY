const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const authController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, nom, prenom } = req.body;
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Créer l'utilisateur
      const userId = await User.create({ email, password, nom, prenom });
      const newUser = await User.findById(userId);
      
      // Générer le token JWT
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.status(201).json({ token, user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Trouver l'utilisateur
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Vérifier le mot de passe
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Générer le token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur' });
    }
  }
};

module.exports = authController; 