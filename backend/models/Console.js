import mongoose from 'mongoose';

const consoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

// Create and export the Console model
const Console = mongoose.model('Console', consoleSchema);

export default Console; // Ensure this is a default export