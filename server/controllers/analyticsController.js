const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get total sales
    const orders = await Order.find({ isPaid: true });
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Get total orders
    const totalOrders = orders.length;
    
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total products
    const totalProducts = await Product.countDocuments();
    
    // Get low stock products (less than 5 items)
    const lowStockProducts = await Product.countDocuments({ countInStock: { $lt: 5, $gt: 0 } });
    
    // Get out of stock products
    const outOfStockProducts = await Product.countDocuments({ countInStock: 0 });
    
    // Get total reviews
    const totalReviews = await Review.countDocuments();
    
    // Get average rating
    const reviews = await Review.find();
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;
    
    // Get recent orders (last 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    // Get recent users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');
    
    res.json({
      totalSales,
      totalOrders,
      totalUsers,
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalReviews,
      avgRating,
      recentOrders,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sales report
// @route   GET /api/admin/sales
// @access  Private/Admin
const getSalesReport = async (req, res) => {
  try {
    const { period, startDate, endDate } = req.query;
    
    let matchStage = { isPaid: true };
    let groupStage = {};
    
    // Set date range for filtering
    if (startDate && endDate) {
      matchStage.paidAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    // Set grouping based on period
    switch (period) {
      case 'daily':
        groupStage = {
          _id: { 
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
            day: { $dayOfMonth: '$paidAt' },
          },
          date: { $first: '$paidAt' },
          sales: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
          items: { $sum: { $size: '$orderItems' } },
        };
        break;
      case 'weekly':
        groupStage = {
          _id: { 
            year: { $year: '$paidAt' },
            week: { $week: '$paidAt' },
          },
          date: { $first: '$paidAt' },
          sales: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
          items: { $sum: { $size: '$orderItems' } },
        };
        break;
      case 'monthly':
      default:
        groupStage = {
          _id: { 
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
          },
          date: { $first: '$paidAt' },
          sales: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
          items: { $sum: { $size: '$orderItems' } },
        };
        break;
    }
    
    // Run aggregation
    const salesData = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: { date: 1 } },
    ]);
    
    // Format the response
    const formattedData = salesData.map(item => ({
      date: item.date,
      sales: item.sales,
      orders: item.orders,
      items: item.items,
    }));
    
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product performance report
// @route   GET /api/admin/products/performance
// @access  Private/Admin
const getProductPerformance = async (req, res) => {
  try {
    // Get paid orders
    const orders = await Order.find({ isPaid: true });
    
    // Count product occurrences and calculate revenue
    const productPerformance = {};
    
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const productId = item.product.toString();
        
        if (!productPerformance[productId]) {
          productPerformance[productId] = {
            productId,
            name: item.name,
            totalSold: 0,
            revenue: 0,
          };
        }
        
        productPerformance[productId].totalSold += item.qty;
        productPerformance[productId].revenue += item.qty * item.price;
      });
    });
    
    // Convert to array and sort by revenue
    const performanceArray = Object.values(productPerformance)
      .sort((a, b) => b.revenue - a.revenue);
    
    res.json(performanceArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer insights
// @route   GET /api/admin/customers/insights
// @access  Private/Admin
const getCustomerInsights = async (req, res) => {
  try {
    // Get all paid orders with user info
    const orders = await Order.find({ isPaid: true }).populate('user', 'name email');
    
    // Group orders by user
    const customerMap = {};
    
    orders.forEach(order => {
      const userId = order.user._id.toString();
      
      if (!customerMap[userId]) {
        customerMap[userId] = {
          userId,
          name: order.user.name,
          email: order.user.email,
          totalSpent: 0,
          orderCount: 0,
          averageOrderValue: 0,
          lastOrderDate: null,
        };
      }
      
      customerMap[userId].totalSpent += order.totalPrice;
      customerMap[userId].orderCount += 1;
      
      // Update last order date if this order is more recent
      const orderDate = new Date(order.paidAt || order.createdAt);
      if (!customerMap[userId].lastOrderDate || 
          orderDate > new Date(customerMap[userId].lastOrderDate)) {
        customerMap[userId].lastOrderDate = orderDate;
      }
    });
    
    // Calculate average order value and convert to array
    const customerInsights = Object.values(customerMap).map(customer => ({
      ...customer,
      averageOrderValue: customer.totalSpent / customer.orderCount,
    }));
    
    // Sort by total spent (descending)
    customerInsights.sort((a, b) => b.totalSpent - a.totalSpent);
    
    res.json(customerInsights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inventory status
// @route   GET /api/admin/inventory
// @access  Private/Admin
const getInventoryStatus = async (req, res) => {
  try {
    // Get all products with inventory info
    const products = await Product.find().select('name countInStock category price');
    
    // Calculate inventory value
    const inventoryValue = products.reduce(
      (sum, product) => sum + (product.price * product.countInStock), 
      0
    );
    
    // Group by category
    const categoryMap = {};
    
    products.forEach(product => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          category: product.category,
          totalItems: 0,
          totalValue: 0,
          products: [],
        };
      }
      
      categoryMap[product.category].totalItems += product.countInStock;
      categoryMap[product.category].totalValue += product.price * product.countInStock;
      categoryMap[product.category].products.push({
        id: product._id,
        name: product.name,
        countInStock: product.countInStock,
        value: product.price * product.countInStock,
      });
    });
    
    // Convert to array
    const categorySummary = Object.values(categoryMap);
    
    // Sort products within each category by stock level (ascending)
    categorySummary.forEach(category => {
      category.products.sort((a, b) => a.countInStock - b.countInStock);
    });
    
    res.json({
      totalProducts: products.length,
      totalInventoryValue: inventoryValue,
      categorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getSalesReport,
  getProductPerformance,
  getCustomerInsights,
  getInventoryStatus,
};