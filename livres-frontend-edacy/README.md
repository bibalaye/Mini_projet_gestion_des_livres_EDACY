# Frontend - Application de Gestion de Livres

Ce projet est une mini application web développée avec Next.js et React pour la gestion d'une bibliothèque de livres.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/bibalaye/Mini_projet_gestion_des_livres_EDACY.git
cd livres-frontend-edacy
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
- Créer un fichier `.env.local` à la racine du projet
- Ajouter les variables suivantes :
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Structure du Projet

```
livres-frontend-edacy/
├── app/                # Pages et composants Next.js
│   ├── components/     # Composants réutilisables
│   ├── hooks/          # Hooks personnalisés
│   ├── lib/            # Utilitaires et API
│   ├── types/          # Types TypeScript
│   └── page.tsx        # Pages de l'application
├── public/             # Fichiers statiques
├── .env.local          # Variables d'environnement
└── package.json        # Dépendances et scripts
```

## Fonctionnalités

- Interface utilisateur moderne et responsive
- Authentification (inscription, connexion)
- Gestion des livres (CRUD)
- Upload d'images
- Affichage des livres avec images
- Navigation intuitive
- Gestion d'état avec React Hooks
- Validation des formulaires
- Gestion des erreurs

## Pages

- `/` - Page d'accueil (liste des livres)
- `/login` - Connexion
- `/register` - Inscription
- `/livres` - Gestion des livres (protégée)
- `/livres/[id]` - Détails d'un livre

## Composants Principaux

- `BookForm` - Formulaire d'ajout/modification de livre
- `ProtectedRoute` - Protection des routes authentifiées
- `Navbar` - Barre de navigation
- `BookCard` - Carte de présentation d'un livre

## Démarrage

```bash
# Développement
npm run dev

# Production
npm run build
npm start
```

## Technologies Utilisées

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- JWT pour l'authentification

## Tests

```bash
npm test
```

## Déploiement

1. Construire l'application :
```bash
npm run build
```


