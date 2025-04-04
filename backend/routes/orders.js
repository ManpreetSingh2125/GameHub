import express from 'express';

const router = express.Router();

// Mock order storage (replace with MongoDB later)
let orders = [];

// Create a new order
router.post('/', (req, res) => {
  const { items, total, shippingDetails } = req.body;

  if (!items || !total || !shippingDetails) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  const order = {
    id: orders.length + 1,
    items,
    total,
    shippingDetails,
    createdAt: new Date(),
  };

  orders.push(order);
  res.status(201).json({ message: 'Order created successfully', order });
});

export default router;