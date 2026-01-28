// File: routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Đường dẫn tới file controller tao viết lúc nãy
const { authenticate } = require('../middleware/auth'); // Middleware xác thực của mày

// --- CÁC ROUTE CÔNG KHAI (PUBLIC) ---

// 1. Lấy tất cả đánh giá của một khóa học (Để ai cũng xem được review trước khi mua)
router.get('/course/:courseId', reviewController.getCourseReviews);


// --- CÁC ROUTE CẦN ĐĂNG NHẬP (PRIVATE) ---

// 2. Thêm đánh giá mới (Phải login mới được đánh giá)
router.post('/', authenticate, reviewController.addReview);

// 3. Sửa đánh giá (Chỉ chủ nhân review hoặc Admin mới được sửa - check logic trong controller)
router.put('/:id', authenticate, reviewController.updateReview);

// 4. Xóa đánh giá
router.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = router;