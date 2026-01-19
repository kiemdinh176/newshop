const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson.controller');
const { authenticate } = require('../middleware/auth');

// public
router.get('/course/:courseId', lessonController.getByCourse);
router.get('/:id', lessonController.getById);

// admin / teacher
router.post('/', authenticate, lessonController.create);
router.put('/:id', authenticate, lessonController.update);
router.delete('/:id', authenticate, lessonController.remove);

module.exports = router;
