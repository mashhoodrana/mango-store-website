const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const SearchHistory = require('../models/searchHistoryModel');
const Review = require('../models/reviewModel');

// @desc    Track user search
// @route   POST /api/recommendations/search
// @access  Private
const trackSearch = async (req, res) => {
  try {
    const { query, filters, resultCount } = req.body;
    
    // Create search history entry
    const searchHistory = new SearchHistory({
      user: req.user._id,
      query,
      filters,
      results: resultCount,
    });
    
    await searchHistory.save();
    
    res.status(201).json({ message: 'Search tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get personalized recommendations for user
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    // Get user's purchase history
    const userOrders = await Order.find({ user: req.user._id, isPaid: true });
    
    // Extract product IDs from orders
    const purchasedProductIds = [];
    userOrders.forEach(order => {
      order.orderItems.forEach(item => {
        purchasedProductIds.push(item.product);
      });
    });
    
    // Get user's search history (last 10 searches)
    const searchHistory = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Extract categories and keywords from search history
    const searchCategories = new Set();
    const searchKeywords = [];
    
    searchHistory.forEach(search => {
      if (search.filters && search.filters.category) {
        searchCategories.add(search.filters.category);
      }
      
      if (search.query) {
        // Extract meaningful keywords (exclude common words)
        const keywords = search.query.toLowerCase()
          .split(' ')
          .filter(word => word.length > 3);
        
        searchKeywords.push(...keywords);
      }
    });
    
    // Get user's highly rated products (4+ stars)
    const userReviews = await Review.find({ 
      user: req.user._id,
      rating: { $gte: 4 }
    });
    
    const highlyRatedProductIds = userReviews.map(review => review.product);
    
    // Build recommendation query
    const recommendationQuery = {
      _id: { $nin: purchasedProductIds }, // Exclude already purchased products
      countInStock: { $gt: 0 }, // Only in-stock products
    };
    
    // If we have search categories, use them for recommendations
    if (searchCategories.size > 0) {
      recommendationQuery.category = { $in: Array.from(searchCategories) };
    }
    
    // Get recommendations based on user's behavior
    const recommendations = await Product.find(recommendationQuery)
      .sort({ rating: -1, numReviews: -1 })
      .limit(10);
    
    // If we don't have enough recommendations, add popular products
    if (recommendations.length < 10) {
      const popularProducts = await Product.find({
        _id: { $nin: [...purchasedProductIds, ...recommendations.map(p => p._id)] },
        countInStock: { $gt: 0 },
      })
        .sort({ numReviews: -1, rating: -1 })
        .limit(10 - recommendations.length);
      
      recommendations.push(...popularProducts);
    }
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // Find products in the same category
    const relatedProducts = await Product.find({
      _id: { $ne: product._id }, // Exclude current product
      category: product.category,
      countInStock: { $gt: 0 }, // Only in-stock products
    })
      .sort({ rating: -1 })
      .limit(6);
    
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trending products
// @route   GET /api/recommendations/trending
// @access  Public
const getTrendingProducts = async (req, res) => {
  try {
    // Get recent orders (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentOrders = await Order.find({
      createdAt: { $gte: lastWeek },
      isPaid: true,
    });
    
    // Count product occurrences in recent orders
    const productCounts = {};
    
    recentOrders.forEach(order => {
      order.orderItems.forEach(item => {
        const productId = item.product.toString();
        productCounts[productId] = (productCounts[productId] || 0) + item.qty;
      });
    });
    
    // Convert to array and sort by count
    const trendingProductIds = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(entry => entry[0]);
    
    // Get trending products
    const trendingProducts = await Product.find({
      _id: { $in: trendingProductIds },
      countInStock: { $gt: 0 },
    });
    
    // Sort products in the same order as trendingProductIds
    const sortedTrendingProducts = trendingProductIds
      .map(id => trendingProducts.find(product => product._id.toString() === id))
      .filter(product => product); // Remove any undefined products
    
    res.json(sortedTrendingProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get search history for user
// @route   GET /api/recommendations/search-history
// @access  Private
const getSearchHistory = async (req, res) => {
  try {
    const searchHistory = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(searchHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear search history for user
// @route   DELETE /api/recommendations/search-history
// @access  Private
const clearSearchHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({ user: req.user._id });
    
    res.json({ message: 'Search history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  trackSearch,
  getRecommendations,
  getRelatedProducts,
  getTrendingProducts,
  getSearchHistory,
  clearSearchHistory,
};