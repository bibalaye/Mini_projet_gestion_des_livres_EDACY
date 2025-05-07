# 📚 Mini Application de Gestion de Livres

Une mini application full-stack permettant aux utilisateurs de **s'inscrire**, **se connecter**, et **gérer une collection de livres** (CRUD) via une interface intuitive.

## 🧩 Fonctionnalités

- 🔐 Authentification (inscription & connexion)
- 📖 Affichage public des livres pour les visiteurs
- 🧑‍💼 Tableau de bord utilisateur avec :
  - ➕ Ajout de livres
  - ✏️ Modification de livres
  - 🗑️ Suppression de livres
  - 📸 Upload d'images pour les livres
- 📦 Architecture full-stack : Next.js (frontend) + Node.js (backend) + MySQL

## 🛠️ Technologies utilisées

### Frontend
- **Framework** : Next.js 14
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **État** : React Hooks
- **HTTP Client** : Axios
- **Authentification** : JWT

### Backend
- **Framework** : Node.js avec Express
- **Base de données** : MySQL
- **Authentification** : JWT
- **Sécurité** : Bcrypt
- **Upload** : Multer pour les images

## 🔧 Installation

### 🖥️ Prérequis

- Node.js (version 14 ou supérieure)
- MySQL
- npm ou yarn

### 🚀 Installation du Backend

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/bibalaye/Mini_projet_gestion_des_livres_EDACY.git
   cd livres-backend-edacy
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Créer une base de données MySQL
   - Copier le fichier `.env.example` en `.env`
   - Configurer les variables d'environnement :
   ```
   DB_HOST=localhost
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=nom_de_la_base
   JWT_SECRET=votre_secret_jwt
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

4. **Démarrer le serveur**
   ```bash
   npm run dev
   ```

### 🎨 Installation du Frontend

1. **Accéder au dossier frontend**
   ```bash
   cd ../livres-frontend-edacy
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   - Créer un fichier `.env.local`
   - Ajouter les variables :
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Démarrer l'application**
   ```bash
   npm run dev
   ```

## 📁 Structure du Projet

```
projet/
├── livres-backend-edacy/
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middleware (auth, upload)
│   ├── models/         # Modèles de données
│   ├── routes/         # Routes API
│   ├── uploads/        # Images des livres
│   └── index.js        # Point d'entrée
│
└── livres-frontend-edacy/
    ├── app/            # Pages Next.js
    │   ├── components/ # Composants réutilisables
    │   ├── hooks/      # Hooks personnalisés
    │   ├── lib/        # Utilitaires
    │   └── types/      # Types TypeScript
    └── public/         # Fichiers statiques
```

## 🔐 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Livres
- `GET /api/livres` - Liste des livres
- `GET /api/livres/:id` - Détails d'un livre
- `POST /api/livres` - Créer un livre
- `PUT /api/livres/:id` - Modifier un livre
- `DELETE /api/livres/:id` - Supprimer un livre
- `GET /api/livres/me/livres` - Livres de l'utilisateur

## 👨‍💻 Auteur

Abiboulaye Sy

## 📄 Licence

Ce projet est sous licence MIT.

---

