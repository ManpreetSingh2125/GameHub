import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
  },
  additionalInfo: {
    requirements: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
});

// Create and export the Game model
const Game = mongoose.model('Game', gameSchema);

export default Game; // Default export