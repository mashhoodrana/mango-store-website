const express = require('express');
const router = express.Router();
const {
  updateReview,
  deleteReview,
  getMyReviews,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

// Routes
router.route('/myreviews')
  .get(protect, getMyReviews);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;