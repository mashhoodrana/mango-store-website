import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Your Cart</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {cart.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between py-4 border-b last:border-b-0"
          >
            <div className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.price} each</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-6">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-10 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center"
                >
                  +
                </button>
              </div>
              
              <span className="font-semibold mr-4">
                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
              </span>
              
              <button 
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={clearCart}
          className="text-red-500 font-medium"
        >
          Clear Cart
        </button>
        
        <div className="text-xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={() => window.location.href = '/checkout'}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;