const Order = require('../models/orderModel');

// @desc    Update order to paid (for COD)
// @route   PUT /api/payments/:id/pay
// @access  Private/Admin
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Update order payment status
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.transactionId || `cod-${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: req.user.email,
    };
    
    if (req.body.notes) {
      order.paymentNotes = req.body.notes;
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment methods
// @route   GET /api/payments/methods
// @access  Public
const getPaymentMethods = async (req, res) => {
  try {
    // For now, we're only implementing COD
    const paymentMethods = [
      {
        id: 'COD',
        name: 'Cash on Delivery',
        description: 'Pay with cash when your order is delivered',
        isActive: true,
      },
      {
        id: 'JazzCash',
        name: 'JazzCash',
        description: 'Pay with JazzCash (Coming Soon)',
        isActive: false,
      },
      {
        id: 'EasyPaisa',
        name: 'EasyPaisa',
        description: 'Pay with EasyPaisa (Coming Soon)',
        isActive: false,
      },
      {
        id: 'Bank Transfer',
        name: 'Bank Transfer',
        description: 'Pay via bank transfer (Coming Soon)',
        isActive: false,
      },
    ];

    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateOrderToPaid,
  getPaymentMethods,
};