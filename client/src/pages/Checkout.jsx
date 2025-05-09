import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(step + 1);
    
    if (step === 3) {
      // Submit order to backend
      console.log('Order submitted:', { customer: formData, order: cart, total: totalPrice });
      // Clear cart after successful order
      clearCart();
    }
  };
  
  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Review' },
    { id: 4, name: 'Confirmation' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((s) => (
          <div 
            key={s.id} 
            className={`flex flex-col items-center ${step >= s.id ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= s.id ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {s.id}
            </div>
            <span className="text-sm">{s.name}</span>
          </div>
        ))}
      </div>
      
      {/* Step 1: Shipping Information */}
      {step === 1 && (
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg"
            >
              Continue to Payment
            </button>
          </div>
        </motion.form>
      )}
      
      {/* Step 2: Payment Method */}
      {step === 2 && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">Please select your preferred payment method:</p>
            
            <div className="space-y-4">
              {/* Credit Card Option */}
              <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-800">Credit/Debit Card</span>
                    <div className="flex ml-3 space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded"></div>
                      <div className="w-8 h-5 bg-red-500 rounded"></div>
                      <div className="w-8 h-5 bg-yellow-400 rounded"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Pay securely with your credit or debit card.</p>
                </div>
              </label>
              
              {/* Cash on Delivery Option */}
              <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-800">Cash on Delivery</span>
                    <div className="ml-3 p-1 bg-green-100 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Pay with cash when your order is delivered.</p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg"
            >
              Continue to Review
            </button>
          </div>
        </motion.form>
      )}
      
      {/* Step 3: Order Review */}
      {step === 3 && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}</p>
              <p>{formData.city}, {formData.postalCode}</p>
              <p>{formData.country}</p>
              <p>{formData.email}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{formData.paymentMethod === 'credit' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                  <div className="flex">
                    <span className="font-medium">{item.quantity}x</span>
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <span>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg"
            >
              Place Order
            </button>
          </div>
        </motion.form>
      )}
      
      {/* Order Confirmation */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've sent a confirmation email to {formData.email}.
            Your delicious mangoes will be on their way soon!
          </p>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left max-w-md mx-auto">
            <p className="font-medium mb-2">Payment Method:</p>
            <p className="text-gray-700">
              {formData.paymentMethod === 'credit' 
                ? 'Credit/Debit Card (Paid)' 
                : 'Cash on Delivery (Pay when your order arrives)'}
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg"
          >
            Continue Shopping
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Checkout;