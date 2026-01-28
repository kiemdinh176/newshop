const pool = require('../config/database');

const Review = {
    getByCourseId: async (courseId) => {
        const [rows] = await pool.execute(
            `SELECT 
                reviews.*, 
                users.name 
             FROM reviews 
             JOIN users ON reviews.user_id = users.id 
             WHERE reviews.course_id = ? 
             ORDER BY reviews.created_at DESC`,
            [courseId]
        );
        return rows;
    },
    // ... các hàm khác giữ nguyên

    // Thêm review mới
    create: async (userId, courseId, rating, comment) => {
        const [result] = await pool.execute(
            `INSERT INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)`,
            [userId, courseId, rating, comment]
        );
        return result.insertId;
    },

    // Sửa review (chỉ cho phép sửa rating và comment)
    update: async (id, userId, rating, comment) => {
        const [result] = await pool.execute(
            `UPDATE reviews SET rating = ?, comment = ? WHERE id = ? AND user_id = ?`,
            [rating, comment, id, userId]
        );
        return result.affectedRows;
    },

    // Xóa review
    delete: async (id, userId) => {
        const [result] = await pool.execute(
            `DELETE FROM reviews WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        return result.affectedRows;
    }
};

module.exports = Review;