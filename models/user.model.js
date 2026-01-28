const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async getByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async create({ name, email, password, phone }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES (?, ?, ?, ?, 'student')`,
      [name, email, hashedPassword, phone]
    );

    return {
      id: result.insertId,
      name,
      email,
      role: 'student'
    };
  },

  async updateProfile(id, { name, phone }) {
    await pool.execute(
      'UPDATE users SET name = ?, phone = ? WHERE id = ?',
      [name, phone, id]
    );

    return this.getById(id);
  },

  async updatePassword(id, password) {
    const hashed = await bcrypt.hash(password, 10);

    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashed, id]
    );

    return true;
  },

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
};

module.exports = User;
