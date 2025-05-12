const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Product = require('./models/productModel');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample users
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

// Sample mango products
const mangoProducts = [
  {
    name: 'Chaunsa Mango',
    description: 'Chaunsa is a premium variety of mango cultivated in Pakistan. It has a rich, sweet flavor and aromatic fragrance that makes it highly desirable.',
    image: '/images/chaunsa.jpg',
    origin: 'Pakistan',
    season: 'Summer',
    category: 'Premium',
    price: 12.99,
    countInStock: 50,
    rating: 4.8,
    numReviews: 12,
    isFeatured: true
  },
  {
    name: 'Sindhri Mango',
    description: 'Sindhri mangoes are known for their distinctive elongated shape and golden-yellow color. They have a sweet, rich flavor with minimal fiber.',
    image: '/images/sindhri.jpg',
    origin: 'Sindh, Pakistan',
    season: 'Summer',
    category: 'Premium',
    price: 10.99,
    countInStock: 35,
    rating: 4.5,
    numReviews: 8,
    isFeatured: true
  },
  {
    name: 'Anwar Ratol Mango',
    description: 'Anwar Ratol is a small to medium-sized mango with an exceptional sweetness and aroma. It\'s considered one of the most delicious varieties.',
    image: '/images/anwar-ratol.jpg',
    origin: 'Punjab, Pakistan',
    season: 'Summer',
    category: 'Premium',
    price: 14.99,
    countInStock: 25,
    rating: 4.9,
    numReviews: 15,
    isFeatured: true
  },
  {
    name: 'Langra Mango',
    description: 'Langra mangoes have a distinct flavor profile with a balance of sweetness and slight tanginess. They have a green skin even when ripe.',
    image: '/images/langra.jpg',
    origin: 'Pakistan',
    season: 'Summer',
    category: 'Standard',
    price: 9.99,
    countInStock: 40,
    rating: 4.3,
    numReviews: 10,
    isFeatured: false
  },
  {
    name: 'Dusehri Mango',
    description: 'Dusehri mangoes are medium-sized with a distinctive pointed shape. They have a sweet, aromatic flavor with minimal fiber.',
    image: '/images/dusehri.jpg',
    origin: 'Pakistan',
    season: 'Summer',
    category: 'Standard',
    price: 8.99,
    countInStock: 45,
    rating: 4.2,
    numReviews: 7,
    isFeatured: false
  }
];

// Import data function
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    
    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    
    // Insert products
    await Product.insertMany(mangoProducts);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data function
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}