const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { authenticate } = require('../middleware/auth');

// user
router.post('/', authenticate, enrollmentController.enroll);
router.get('/my-courses', authenticate, enrollmentController.getMyCourses);

// admin
router.get('/', authenticate, enrollmentController.getAll);
router.delete('/', authenticate, enrollmentController.remove);

module.exports = router;
