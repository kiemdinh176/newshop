const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, authorize } = require('../middleware/auth');

// public
router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);

// teacher
router.post(
  '/',
  authenticate,
  authorize('teacher'),
  courseController.create
);

router.put(
  '/:id',
  authenticate,
  authorize('teacher'),
  courseController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize('teacher'),
  courseController.remove
);

module.exports = router;
