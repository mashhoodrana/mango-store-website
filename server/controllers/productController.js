const Product = require('../models/productModel');
const logger = require('../utils/logger');

// Get all products with filtering and sorting
// @desc    Get all products with advanced filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    
    // Build query object for filtering
    const queryObj = {};
    
    // Search by keyword (name or description)
    if (req.query.keyword) {
      queryObj.$or = [
        { 
          name: { 
            $regex: req.query.keyword, 
            $options: 'i' 
          } 
        },
        { 
          description: { 
            $regex: req.query.keyword, 
            $options: 'i' 
          } 
        },
      ];
    }
    
    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      queryObj.category = req.query.category;
    }
    
    // Filter by price range
    if (req.query.minPrice && req.query.maxPrice) {
      queryObj.price = { 
        $gte: Number(req.query.minPrice), 
        $lte: Number(req.query.maxPrice) 
      };
    } else if (req.query.minPrice) {
      queryObj.price = { $gte: Number(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      queryObj.price = { $lte: Number(req.query.maxPrice) };
    }
    
    // Filter by rating
    if (req.query.rating) {
      queryObj.rating = { $gte: Number(req.query.rating) };
    }
    
    // Filter by availability
    if (req.query.inStock === 'true') {
      queryObj.countInStock = { $gt: 0 };
    }
    
    // Count total matching documents
    const count = await Product.countDocuments(queryObj);
    
    // Build sort object
    let sortObj = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy.split(':')[0];
      const sortDirection = req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1;
      sortObj[sortField] = sortDirection;
    } else {
      // Default sort by createdAt descending (newest first)
      sortObj = { createdAt: -1 };
    }
    
    // Execute query with pagination and sorting
    const products = await Product.find(queryObj)
      .sort(sortObj)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    // Return products with pagination info
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
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

// @desc    Update product inventory
// @route   PUT /api/products/:id/inventory
// @access  Private/Admin
const updateProductInventory = async (req, res) => {
  try {
    const { countInStock, adjustmentReason } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // Record previous stock level
    const previousStock = product.countInStock;
    
    // Update stock level
    product.countInStock = countInStock;
    
    // Create inventory adjustment log (you would need to create this model)
    // const inventoryLog = new InventoryLog({
    //   product: product._id,
    //   previousStock,
    //   newStock: countInStock,
    //   adjustmentReason,
    //   adjustedBy: req.user._id,
    // });
    
    // await inventoryLog.save();
    await product.save();
    
    res.json({
      message: 'Inventory updated successfully',
      product: {
        _id: product._id,
        name: product.name,
        countInStock: product.countInStock,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk update products
// @route   PUT /api/products/bulk
// @access  Private/Admin
const bulkUpdateProducts = async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'No products provided for update' });
      return;
    }
    
    const updateResults = [];
    
    // Process each product update
    for (const item of products) {
      try {
        const product = await Product.findById(item.id);
        
        if (!product) {
          updateResults.push({
            id: item.id,
            success: false,
            message: 'Product not found',
          });
          continue;
        }
        
        // Update fields if provided
        if (item.name) product.name = item.name;
        if (item.price) product.price = item.price;
        if (item.description) product.description = item.description;
        if (item.category) product.category = item.category;
        if (item.countInStock !== undefined) product.countInStock = item.countInStock;
        if (item.image) product.image = item.image;
        
        await product.save();
        
        updateResults.push({
          id: product._id,
          name: product.name,
          success: true,
        });
      } catch (error) {
        updateResults.push({
          id: item.id,
          success: false,
          message: error.message,
        });
      }
    }
    
    res.json({
      message: 'Bulk update completed',
      results: updateResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload product image
// @route   POST /api/products/upload
// @access  Private/Admin
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create relative path for frontend use
    const imagePath = `/uploads/${req.file.filename}`;
    
    logger.info(`Product image uploaded: ${imagePath}`);
    
    res.json({
      message: 'Image uploaded successfully',
      image: imagePath
    });
  } catch (error) {
    logger.error(`Image upload error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  updateProductInventory,
  bulkUpdateProducts,
  uploadProductImage,
};