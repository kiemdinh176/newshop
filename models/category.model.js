const pool = require('../config/database');

const Category = {
  async getAll() {
    const [rows] = await pool.execute(
      'SELECT id, name FROM categories ORDER BY id DESC'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name FROM categories WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async create(name) {
    const [result] = await pool.execute(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    return {
      id: result.insertId,
      name
    };
  },

  async update(id, name) {
    await pool.execute(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return true;
  },

  async remove(id) {
    await pool.execute(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return true;
  }
};

module.exports = Category;
