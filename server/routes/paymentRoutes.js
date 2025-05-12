const express = require('express');
const router = express.Router();
const {
  updateOrderToPaid,
  getPaymentMethods,
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get payment methods
router.route('/methods')
  .get(getPaymentMethods);

// Update order to paid (admin only for COD)
router.route('/:id/pay')
  .put(protect, admin, updateOrderToPaid);

module.exports = router;