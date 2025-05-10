const Product = require('../models/productModel');

// Get all products with filtering and sorting
const getProducts = async (req, res) => {
  try {
    // Build filter object
    let filter = {};
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.origin) {
      filter.origin = req.query.origin;
    }
    
    if (req.query.season) {
      filter.season = req.query.season;
    }
    
    if (req.query.featured) {
      filter.isFeatured = req.query.featured === 'true';
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    
    // Text search
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    // Build sort object
    let sort = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      // Default sort by createdAt
      sort.createdAt = -1;
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const count = await Product.countDocuments(filter);
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product fields
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};