const Review = require('../models/reviewModel');

exports.getCourseReviews = async (req, res) => {
    try {
        const reviews = await Review.getByCourseId(req.params.courseId);
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { course_id, rating, comment } = req.body;
        const userId = req.user.id; // Giả sử mày đã có middleware auth để lấy user.id
        
        const reviewId = await Review.create(userId, course_id, rating, comment);
        res.json({ success: true, message: "Đã thêm đánh giá!", reviewId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const affectedRows = await Review.update(req.params.id, req.user.id, rating, comment);
        
        if (affectedRows === 0) return res.status(403).json({ success: false, message: "Không có quyền sửa hoặc không tìm thấy!" });
        res.json({ success: true, message: "Cập nhật thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const affectedRows = await Review.delete(req.params.id, req.user.id);
        if (affectedRows === 0) return res.status(403).json({ success: false, message: "Không có quyền xóa!" });
        res.json({ success: true, message: "Đã xóa review!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};