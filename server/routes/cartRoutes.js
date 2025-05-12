const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  syncCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/sync')
  .put(protect, syncCart);

router.route('/:id')
  .delete(protect, removeFromCart);

module.exports = router;