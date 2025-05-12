const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter (configure based on your email provider)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send order confirmation email
const sendOrderConfirmation = async (order, user) => {
  try {
    // Format order items for email
    const itemsList = order.orderItems.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">Rs. ${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">Rs. ${(item.qty * item.price).toFixed(2)}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: `"Mango Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8b500; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Thank You for Your Order!</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #ddd; background-color: #fff;">
            <p>Hello ${user.name},</p>
            <p>We've received your order and are working on it. Here are your order details:</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            </div>
            
            <h3>Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Quantity</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Price</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="text-align: right; padding: 10px;"><strong>Subtotal:</strong></td>
                  <td style="padding: 10px;">Rs. ${order.totalPrice - order.taxPrice - order.shippingPrice}</td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align: right; padding: 10px;"><strong>Shipping:</strong></td>
                  <td style="padding: 10px;">Rs. ${order.shippingPrice}</td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align: right; padding: 10px;"><strong>Tax:</strong></td>
                  <td style="padding: 10px;">Rs. ${order.taxPrice}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                  <td colspan="3" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
                  <td style="padding: 10px;"><strong>Rs. ${order.totalPrice}</strong></td>
                </tr>
              </tfoot>
            </table>
            
            <div style="margin-top: 20px;">
              <h3>Shipping Address</h3>
              <p>
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                ${order.shippingAddress.country}
              </p>
            </div>
            
            <p style="margin-top: 30px;">Thank you for shopping with Mango Store!</p>
            <p>If you have any questions, please contact our customer service.</p>
          </div>
          
          <div style="background-color: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Mango Store. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Order confirmation email sent to ${user.email}: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  sendOrderConfirmation
};