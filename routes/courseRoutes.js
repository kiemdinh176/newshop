// File: routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, authorize } = require('../middleware/auth');

// --- CÁC ROUTE CÔNG KHAI (PUBLIC) ---

// 1. Lấy Top 10 (PHẢI ĐẶT TRÊN :id)
router.get('/top10', courseController.getTop10);

// 2. Lấy tất cả hoặc lọc theo danh mục
router.get('/', courseController.getAll);

// 3. Lấy chi tiết theo ID
router.get('/:id', courseController.getById);

// --- CÁC ROUTE CẦN ĐĂNG NHẬP (TEACHER) ---
router.post('/', authenticate, authorize('teacher'), courseController.create);
router.put('/:id', authenticate, authorize('teacher'), courseController.update);
router.delete('/:id', authenticate, authorize('teacher'), courseController.remove);

module.exports = router;