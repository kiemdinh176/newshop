const pool = require('../config/database');

const Course = {
  async getAll(categoryId = null) {
    let sql = `
      SELECT c.id, c.title, c.price, c.image, ca.name AS category, u.name AS teacher
      FROM courses c
      JOIN categories ca ON c.category_id = ca.id
      JOIN users u ON c.teacher_id = u.id
    `;
    const params = [];

    if (categoryId) {
      sql += ` WHERE c.category_id = ?`;
      params.push(categoryId);
    }

    sql += ` ORDER BY c.id DESC`;
    const [rows] = await pool.execute(sql, params);
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
  },
  // Lấy tất cả hoặc lọc theo category_id
  

  // API lấy Top 10 khóa học nhiều học viên nhất
  async getTop10() {
    const [rows] = await pool.execute(`
      SELECT 
        c.*, 
        ca.name AS category_name,
        u.name AS teacher_name,
        COUNT(e.course_id) AS student_count -- Thay e.id thành e.course_id
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN categories ca ON c.category_id = ca.id
      LEFT JOIN users u ON c.teacher_id = u.id
      GROUP BY c.id
      ORDER BY student_count DESC
      LIMIT 6`);
    return rows;
  },
  // Các hàm getById, create, update, remove giữ nguyên như bạn đã viết..
};
  
module.exports = Course;
