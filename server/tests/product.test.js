const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the Express app
const app = require('../server'); // You'll need to modify server.js to export the app

describe('Product API', () => {
  // Connect to test database before tests
  beforeAll(async () => {
    // Use a test database or your development database
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test getting all products
  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.products)).toBeTruthy();
  });

  // Test getting a single product
  it('should get a product by ID', async () => {
    // First get all products to get a valid ID
    const productsRes = await request(app).get('/api/products');
    
    // If there are products, test getting one by ID
    if (productsRes.body.products && productsRes.body.products.length > 0) {
      const productId = productsRes.body.products[0]._id;
      
      const res = await request(app)
        .get(`/api/products/${productId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body._id).toEqual(productId);
    } else {
      // Skip this test if no products exist
      console.log('No products found to test getProductById');
    }
  });

  // Test product not found
  it('should return 404 for non-existent product', async () => {
    const res = await request(app)
      .get('/api/products/60f5e8b5e047de001c9b1234'); // Non-existent ID
    
    expect(res.statusCode).toEqual(404);
  });
});