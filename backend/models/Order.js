import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;