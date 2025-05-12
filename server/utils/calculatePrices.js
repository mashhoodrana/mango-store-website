/**
 * Calculate order prices
 * @param {Array} orderItems - Array of order items
 * @returns {Object} - Object containing itemsPrice, taxPrice, shippingPrice, and totalPrice
 */
const calculatePrices = (orderItems) => {
  // Calculate items price
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Calculate tax price (10% of items price)
  const taxPrice = Number((0.10 * itemsPrice).toFixed(2));

  // Calculate shipping price (free shipping for orders over $100)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Calculate total price
  const totalPrice = Number(
    (itemsPrice + taxPrice + shippingPrice).toFixed(2)
  );

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    taxPrice,
    shippingPrice,
    totalPrice,
  };
};

module.exports = calculatePrices;