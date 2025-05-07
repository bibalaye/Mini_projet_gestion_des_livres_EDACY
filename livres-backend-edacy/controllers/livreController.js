const Livre = require('../models/Livre');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs-extra');

const livreController = {
  create: async (req, res) => {
    try {
      console.log('Données reçues:', req.body);
      console.log('Fichier reçu:', req.file);
      console.log('Utilisateur:', req.user);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Erreurs de validation:', errors.array());
        return res.status(400).json({ 
          message: 'Erreur de validation',
          errors: errors.array() 
        });
      }

      // Vérifier que les champs requis sont présents
      const requiredFields = ['titre', 'auteur', 'annee_publication', 'genre', 'description'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: 'Champs manquants',
          errors: missingFields.map(field => ({
            param: field,
            msg: `Le champ ${field} est requis`
          }))
        });
      }

      let imagePath = null;
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
      }

      const livreData = {
        titre: req.body.titre,
        auteur: req.body.auteur,
        annee_publication: parseInt(req.body.annee_publication),
        genre: req.body.genre,
        description: req.body.description,
        image: imagePath,
        user_id: req.user.userId
      };

      console.log('Données du livre à créer:', livreData);

      const livreId = await Livre.create(livreData);
      console.log('Livre créé avec ID:', livreId);
      
      const livre = await Livre.findById(livreId);
      console.log('Livre récupéré:', livre);

      res.status(201).json(livre);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        message: 'Erreur lors de la création du livre',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const livres = await Livre.findAll();
      res.json(livres);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des livres' });
    }
  },

  getById: async (req, res) => {
    try {
      const livre = await Livre.findById(req.params.id);
      if (!livre) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.json(livre);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération du livre' });
    }
  },

  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const livre = await Livre.findById(req.params.id);
      if (!livre) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      if (livre.user_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      let imagePath = livre.image;
      if (req.file) {
        // Supprimer l'ancienne image si elle existe
        if (livre.image) {
          const oldImagePath = path.join(__dirname, '..', livre.image);
          await fs.remove(oldImagePath);
        }
        imagePath = `/uploads/${req.file.filename}`;
      }

      const updatedLivre = await Livre.update(req.params.id, {
        ...req.body,
        image: imagePath
      });
      res.json(updatedLivre);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du livre' });
    }
  },

  delete: async (req, res) => {
    try {
      const livre = await Livre.findById(req.params.id);
      if (!livre) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      if (livre.user_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      // Supprimer l'image si elle existe
      if (livre.image) {
        const imagePath = path.join(__dirname, '..', livre.image);
        await fs.remove(imagePath);
      }

      await Livre.delete(req.params.id);
      res.json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
      console.error('Erreur détaillée:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression du livre' });
    }
  },

  getMyLivres: async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }

      const livres = await Livre.findByUserId(req.user.userId);
      res.json(livres || []);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (error.message === 'L\'ID de l\'utilisateur est requis') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erreur lors de la récupération de vos livres' });
    }
  }
};

module.exports = livreController; 