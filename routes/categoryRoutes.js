const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middleware/auth');

// public
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// teacher only
router.post(
  '/',
  authenticate,
  authorize('teacher'),
  categoryController.create
);

router.put(
  '/:id',
  authenticate,
  authorize('teacher'),
  categoryController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize('teacher'),
  categoryController.remove
);

module.exports = router;
