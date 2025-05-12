const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  uploadProductImage,
  updateProductInventory,
  bulkUpdateProducts,
} = require('../controllers/productController');
const {
  createProductReview,
  getProductReviews,
} = require('../controllers/reviewController');
const { getRelatedProducts } = require('../controllers/recommendationController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Product routes
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/bulk')
  .put(protect, admin, bulkUpdateProducts);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/inventory')
  .put(protect, admin, updateProductInventory);

// Review routes
router.route('/:id/reviews')
  .get(getProductReviews)
  .post(protect, createProductReview);

// Related products route
router.route('/:id/related')
  .get(getRelatedProducts);

// Add image upload route
// Upload product image
router.post('/upload', protect, admin, upload.single('image'), uploadProductImage);
module.exports = router;