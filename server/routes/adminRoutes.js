const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSalesReport,
  getProductPerformance,
  getCustomerInsights,
  getInventoryStatus,
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect all routes with admin middleware
router.use(protect, admin);

// Dashboard and analytics routes
router.get('/dashboard', getDashboardStats);
router.get('/sales', getSalesReport);
router.get('/products/performance', getProductPerformance);
router.get('/customers/insights', getCustomerInsights);
router.get('/inventory', getInventoryStatus);

module.exports = router;