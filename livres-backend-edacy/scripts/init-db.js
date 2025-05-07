const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDatabase() {
  try {
    // Création de la connexion sans spécifier la base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Lecture du fichier SQL
    const sqlFile = path.join(__dirname, '../config/init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Exécution des requêtes SQL
    const queries = sql.split(';').filter(query => query.trim());
    for (const query of queries) {
      await connection.query(query);
    }

    console.log('Base de données initialisée avec succès');
    await connection.end();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

initDatabase(); 