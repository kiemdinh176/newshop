const pool = require('../config/database');

const Enrollment = {
  async checkExists(userId, courseId) {
    const [rows] = await pool.execute(
      'SELECT 1 FROM enrollments WHERE user_id = ? AND course_id = ? LIMIT 1',
      [userId, courseId]
    );
    return rows.length > 0;
  },

  async create(data) {
    const { user_id, course_id, price, role } = data;

    await pool.execute(
      `INSERT INTO enrollments 
       (user_id, course_id, price, role)
       VALUES (?, ?, ?, ?)`,
      [user_id, course_id, price, role]
    );

    return {
      user_id,
      course_id,
      price,
      role
    };
  },

  async getByUser(userId) {
    const [rows] = await pool.execute(
      `
      SELECT 
        c.id AS course_id,
        c.title,
        c.image,
        e.price,
        e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ?
      ORDER BY e.enrolled_at DESC
      `,
      [userId]
    );
    return rows;
  },

  async getAll() {
    const [rows] = await pool.execute(
      `
      SELECT 
        u.name AS user_name,
        u.email,
        c.title AS course_title,
        e.price,
        e.role,
        e.enrolled_at
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrolled_at DESC
      `
    );
    return rows;
  },

  async remove(userId, courseId) {
    await pool.execute(
      'DELETE FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
  }
};

module.exports = Enrollment;
