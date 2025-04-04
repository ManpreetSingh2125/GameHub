import Order from '../models/Order.js';
import paymentRoutes from './routes/payment.js';


router.post('/create-payment-intent', async (req, res) => {
  try {
    const { totalAmount, userId, items } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'usd',
    });

    // Save the order to the database
    const order = new Order({
      userId,
      items,
      totalAmount,
    });
    await order.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Server error' });
  }
});