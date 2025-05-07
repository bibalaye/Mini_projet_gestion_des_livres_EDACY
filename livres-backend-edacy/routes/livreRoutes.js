const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { body } = require('express-validator');

// Validation des données
const validateLivre = [
  body('titre').notEmpty().withMessage('Le titre est requis'),
  body('auteur').notEmpty().withMessage('L\'auteur est requis'),
  body('annee_publication').isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('L\'année de publication doit être valide'),
  body('genre').notEmpty().withMessage('Le genre est requis'),
  body('description').notEmpty().withMessage('La description est requise')
];

// Routes non protégées par authentification
router.get('/', livreController.getAll);
router.get('/:id', livreController.getById);

// Routes protégées par authentification
router.use(auth);

// Routes CRUD
router.post('/', upload.single('image'), validateLivre, livreController.create);
router.get('/me/livres', livreController.getMyLivres);
router.put('/:id', upload.single('image'), validateLivre, livreController.update);
router.delete('/:id', livreController.delete);

module.exports = router;