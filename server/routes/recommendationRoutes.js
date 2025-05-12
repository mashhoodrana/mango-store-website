const express = require('express');
const router = express.Router();
const {
  trackSearch,
  getRecommendations,
  getTrendingProducts,
  getSearchHistory,
  clearSearchHistory,
} = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.route('/')
  .get(protect, getRecommendations);

router.route('/trending')
  .get(getTrendingProducts);

router.route('/search')
  .post(protect, trackSearch);

router.route('/search-history')
  .get(protect, getSearchHistory)
  .delete(protect, clearSearchHistory);

module.exports = router;