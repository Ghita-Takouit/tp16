# Bank Dashboard - Gestion des Comptes

Application web moderne de gestion de comptes bancaires développée avec React et GraphQL.

## 📋 Fonctionnalités

- **Affichage des comptes** : Visualisation de tous les comptes bancaires avec leur solde et type
- **Création de comptes** : Formulaire pour créer de nouveaux comptes (Courant ou Épargne)
- **Interface moderne** : Design dark avec Tailwind CSS
- **GraphQL API** : Communication en temps réel avec le serveur GraphQL
- **Actualisation en direct** : Mise à jour automatique de la liste après création

## 🛠️ Technologies utilisées

- **Frontend** : React 19.2.0
- **API** : Apollo Client & GraphQL
- **Styling** : Tailwind CSS
- **Backend** : Node.js (serveur mock GraphQL)

## 📦 Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Ghita-Takouit/tp16.git
   cd tp16
   ```

2. **Installer les dépendances**
   ```bash
   npm install --legacy-peer-deps
   ```

## 🚀 Démarrage

Pour lancer l'application, vous devez démarrer le serveur backend et le frontend.

### 1. Démarrer le serveur GraphQL (Backend)

Dans un terminal :
```bash
node server/mock-server.js
```

Le serveur démarre sur `http://localhost:8082/graphql`

### 2. Démarrer l'application React (Frontend)

Dans un autre terminal :
```bash
npm start
```

L'application s'ouvre automatiquement dans votre navigateur sur `http://localhost:3000`

## 📱 Utilisation

1. **Créer un compte** : Remplissez le formulaire avec le solde initial et sélectionnez le type de compte
2. **Voir les comptes** : Tous les comptes s'affichent sous forme de cartes colorées
3. **Actualiser** : Cliquez sur le bouton de rafraîchissement pour mettre à jour la liste

## 📂 Structure du projet

```
tp16/
├── public/           # Fichiers statiques
├── server/           # Serveur GraphQL mock
│   └── mock-server.js
├── src/
│   ├── apollo/       # Configuration Apollo Client
│   ├── components/   # Composants React
│   │   ├── CompteList.js
│   │   └── CreateCompte.js
│   ├── graphql/      # Requêtes et mutations GraphQL
│   ├── App.js        # Composant principal
│   └── index.js      # Point d'entrée
└── package.json
```

## 🎨 Types de comptes

- **COURANT** : Compte courant (couleur indigo)
- **EPARGNE** : Compte épargne (couleur violette)

## 📄 Licence

Ce projet est développé à des fins éducatives.
