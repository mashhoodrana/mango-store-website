import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return { ...state, items: updatedItems };
      } else {
        // New item, add to cart
        return { 
          ...state, 
          items: [...state.items, { ...action.payload, quantity: 1 }] 
        };
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || []
  };
  
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);
  
  // Calculate total price
  const totalPrice = state.items.reduce(
    (total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 
    0
  );
  
  // Calculate total items
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider value={{ 
      cart: state.items, 
      totalPrice, 
      totalItems,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      updateQuantity: (id, quantity) => dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id, quantity } 
      }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' })
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);