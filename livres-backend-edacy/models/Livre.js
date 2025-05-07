const pool = require('../config/database');

class Livre {
  static async create({ titre, auteur, annee_publication, genre, description, image, user_id }) {
    try {
      console.log('Données reçues pour la création:', { titre, auteur, annee_publication, genre, description, image, user_id });

      if (!user_id) {
        throw new Error('L\'ID de l\'utilisateur est requis');
      }

      const [result] = await pool.execute(
        'INSERT INTO livres (titre, auteur, annee_publication, genre, description, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [titre, auteur, annee_publication, genre, description, image || null, user_id]
      );
      console.log('Résultat de l\'insertion:', result);
      return result.insertId;
    } catch (error) {
      console.error('Erreur détaillée lors de la création du livre:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM livres');
      return rows;
    } catch (error) {
      console.error('Erreur lors de la récupération des livres:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM livres WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Erreur lors de la récupération du livre:', error);
      throw error;
    }
  }

  static async update(id, { titre, auteur, annee_publication, genre, description, image }) {
    try {
      await pool.execute(
        'UPDATE livres SET titre = ?, auteur = ?, annee_publication = ?, genre = ?, description = ?, image = ? WHERE id = ?',
        [titre, auteur, annee_publication, genre, description, image || null, id]
      );
      return this.findById(id);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du livre:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM livres WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      if (!userId) {
        throw new Error('L\'ID de l\'utilisateur est requis');
      }
      const [rows] = await pool.execute('SELECT * FROM livres WHERE user_id = ?', [userId]);
      return rows || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des livres de l\'utilisateur:', error);
      throw error;
    }
  }
}

module.exports = Livre; 