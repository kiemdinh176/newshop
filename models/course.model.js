const pool = require('../config/database');

const Course = {
  async getAll() {
    const [rows] = await pool.execute(`
      SELECT c.id, c.title, c.price, c.image, c.status,
             ca.name AS category,
             u.name AS teacher
      FROM courses c
      JOIN categories ca ON c.category_id = ca.id
      JOIN users u ON c.teacher_id = u.id
      ORDER BY c.id DESC
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM courses WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const {
      teacher_id,
      category_id,
      title,
      description,
      price,
      image
    } = data;

    const [result] = await pool.execute(
      `INSERT INTO courses
      (teacher_id, category_id, title, description, price, image)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        teacher_id,
        category_id,
        title,
        description || '',
        price,
        image || ''
      ]
    );

    return {
      id: result.insertId,
      title,
      price
    };
  },

  async update(id, data) {
    const { title, description, price, image, category_id, status } = data;

    await pool.execute(
      `UPDATE courses
       SET title = ?, description = ?, price = ?, image = ?, category_id = ?, status = ?
       WHERE id = ?`,
      [
        title,
        description,
        price,
        image,
        category_id,
        status,
        id
      ]
    );
    return true;
  },

  async remove(id) {
    await pool.execute(
      'DELETE FROM courses WHERE id = ?',
      [id]
    );
    return true;
  }
};

module.exports = Course;
