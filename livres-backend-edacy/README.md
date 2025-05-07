# Backend - API de Gestion de Livres

Ce projet est une API RESTful développée avec Node.js et Express pour la gestion d'une bibliothèque de livres.

## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd livres-backend-edacy
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer la base de données :
- Créer une base de données MySQL
- Copier le fichier `.env.example` en `.env`
- Modifier les variables d'environnement dans `.env` :
```
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=nom_de_la_base
JWT_SECRET=votre_secret_jwt
FRONTEND_URL=http://localhost:3000
PORT=5000
```

4. Exécuter les migrations de la base de données :
```bash
npm run migrate
```

## Structure du Projet

```
livres-backend-edacy/
├── controllers/         # Contrôleurs pour la logique métier
├── middleware/          # Middleware (authentification, upload)
├── models/             # Modèles de données
├── routes/             # Routes de l'API
├── uploads/            # Dossier pour stocker les images
├── .env                # Variables d'environnement
├── index.js            # Point d'entrée de l'application
└── package.json        # Dépendances et scripts
```

## Fonctionnalités

- Authentification des utilisateurs (inscription, connexion)
- Gestion des livres (CRUD)
- Upload d'images pour les livres
- Sécurité avec JWT
- Validation des données
- Gestion des erreurs

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Récupérer le profil utilisateur

### Livres
- `GET /api/livres` - Liste tous les livres
- `GET /api/livres/:id` - Détails d'un livre
- `POST /api/livres` - Créer un livre
- `PUT /api/livres/:id` - Mettre à jour un livre
- `DELETE /api/livres/:id` - Supprimer un livre
- `GET /api/livres/me/livres` - Liste les livres de l'utilisateur connecté

## Démarrage

```bash
# Développement
npm run dev

# Production
npm start
```

## Sécurité

- Authentification JWT
- Validation des données
- Protection des routes
- Gestion des erreurs
- CORS configuré
- Limite de taille pour les uploads

## Tests

```bash
npm test
```

## Déploiement

1. Configurer les variables d'environnement pour la production
2. Construire l'application :
```bash
npm run build
```
3. Déployer sur votre serveur

