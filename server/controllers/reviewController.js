const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      res.status(400).json({ message: 'Product already reviewed' });
      return;
    }

    // Check if user has purchased this product (verified purchase)
    const verifiedPurchase = await Order.findOne({
      user: req.user._id,
      'orderItems.product': productId,
      isPaid: true,
    });

    // Create review
    const review = new Review({
      user: req.user._id,
      product: productId,
      name: req.user.name,
      rating: Number(rating),
      title,
      comment,
      isVerifiedPurchase: !!verifiedPurchase,
    });

    await review.save();

    // Update product rating
    await updateProductRating(productId);

    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    // Check if the review belongs to the user
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to update this review' });
      return;
    }

    // Update review
    review.rating = Number(rating) || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    // Update product rating
    await updateProductRating(review.product);

    res.json({ message: 'Review updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    // Check if the review belongs to the user or if user is admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401).json({ message: 'Not authorized to delete this review' });
      return;
    }

    const productId = review.product;

    await review.deleteOne();

    // Update product rating
    await updateProductRating(productId);

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews by a user
// @route   GET /api/reviews/myreviews
// @access  Private
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('product', 'name image')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to update product rating
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  
  if (reviews.length === 0) {
    // If no reviews, reset rating and numReviews
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
    return;
  }
  
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalRating / reviews.length;
  
  await Product.findByIdAndUpdate(productId, {
    rating: avgRating,
    numReviews: reviews.length,
  });
};

module.exports = {
  createProductReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getMyReviews,
};