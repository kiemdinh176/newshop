const pool = require('../config/database');

const Lesson = {
  async getByCourse(courseId) {
    const [rows] = await pool.execute(
      'SELECT * FROM lessons WHERE course_id = ? ORDER BY sort_order ASC',
      [courseId]
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM lessons WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const {
      course_id,
      title,
      video = null,
      content = null,
      sort_order = 0,
      length = null
    } = data;

    const [result] = await pool.execute(
      `INSERT INTO lessons
       (course_id, title, video, content, sort_order, length)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [course_id, title, video, content, sort_order, length]
    );

    return {
      id: result.insertId,
      course_id,
      title,
      video,
      content,
      sort_order,
      length
    };
  },

  async update(id, data) {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    if (!fields.length) return;

    values.push(id);

    await pool.execute(
      `UPDATE lessons SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  },

  async remove(id) {
    await pool.execute('DELETE FROM lessons WHERE id = ?', [id]);
  }
};

module.exports = Lesson;
