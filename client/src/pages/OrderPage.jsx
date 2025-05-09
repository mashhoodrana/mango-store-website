import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const OrderPage = () => {
  // Get addItem function from cart context
  const { addItem } = useCart();
  
  // Define a default image for mangoes
  const defaultMangoImage = 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    mangoType: '',
    quantity: 1,
    deliveryDate: '',
    specialInstructions: ''
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Available mango types
  const mangoTypes = [
    { id: 'sindhri', name: 'Sindhri', price: 12.99 },
    { id: 'chaunsa', name: 'Chaunsa', price: 14.99 },
    { id: 'anwar_ratol', name: 'Anwar Ratol', price: 16.99 },
    { id: 'langra', name: 'Langra', price: 13.99 },
    { id: 'dusehri', name: 'Dusehri', price: 11.99 },
    { id: 'fajri', name: 'Fajri', price: 15.99 }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.mangoType) tempErrors.mangoType = "Please select a mango type";
    if (!formData.deliveryDate) tempErrors.deliveryDate = "Delivery date is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Find the selected mango
      const selectedMango = mangoTypes.find(mango => mango.id === formData.mangoType);
      
      // Create an item object for the cart
      const orderItem = {
        id: selectedMango.id,
        name: selectedMango.name,
        price: `$${selectedMango.price}`,
        quantity: formData.quantity,
        image: selectedMango.image || defaultMangoImage // Use a default image if none exists
      };
      
      // Add to cart
      addItem(orderItem);
      
      // Show success message
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        mangoType: '',
        quantity: 1,
        deliveryDate: '',
        specialInstructions: ''
      });
      
      // Optionally redirect to cart
      setTimeout(() => {
        window.location.href = '/cart';
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  // Calculate total price
  const calculateTotal = () => {
    const selectedMango = mangoTypes.find(mango => mango.id === formData.mangoType);
    return selectedMango ? (selectedMango.price * formData.quantity).toFixed(2) : '0.00';
  };

  // Reset success message after 5 seconds
  useEffect(() => {
    let timer;
    if (submitSuccess) {
      timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [submitSuccess]);

  return (
    <motion.div 
      className="pt-28 pb-20 bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 min-h-screen"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Your Premium Mangoes
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Fill out the form below to place your order for our delicious, fresh mangoes.
            </p>
          </div>

          {submitSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-6 rounded-lg mb-8"
            >
              <p className="font-bold">Order Submitted Successfully!</p>
              <p>Thank you for your order. We'll contact you shortly to confirm your delivery details.</p>
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
              </div>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="mb-4 md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 mb-2">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              {/* Order Details */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Details</h2>
              </div>
              
              <div className="mb-4">
                <label htmlFor="mangoType" className="block text-gray-700 dark:text-gray-300 mb-2">Mango Type *</label>
                <select
                  id="mangoType"
                  name="mangoType"
                  value={formData.mangoType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.mangoType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a mango type</option>
                  {mangoTypes.map(mango => (
                    <option key={mango.id} value={mango.id}>
                      {mango.name} (${mango.price})
                    </option>
                  ))}
                </select>
                {errors.mangoType && <p className="text-red-500 text-sm mt-1">{errors.mangoType}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="20"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="deliveryDate" className="block text-gray-700 dark:text-gray-300 mb-2">Preferred Delivery Date *</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
              </div>
              
              <div className="mb-4 md:col-span-2">
                <label htmlFor="specialInstructions" className="block text-gray-700 dark:text-gray-300 mb-2">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Any special requests or delivery instructions..."
                ></textarea>
              </div>
            </div>
            
            {/* Order Summary */}
            {formData.mangoType && (
              <div className="mt-8 p-6 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Mango Type:</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {mangoTypes.find(mango => mango.id === formData.mangoType)?.name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Price per unit:</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    ${mangoTypes.find(mango => mango.id === formData.mangoType)?.price}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Quantity:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formData.quantity}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600 mt-4">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">Total:</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">${calculateTotal()}</span>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderPage;