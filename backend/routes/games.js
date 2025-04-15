import express from 'express';
import Game from '../models/Game.js'; // Import the Game model
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware for admin authentication

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new game (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, rating, category, additionalInfo } = req.body;

    // Validate input
    if (!name || !price || !description || rating === undefined || !category || !additionalInfo) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newGame = new Game({
      name,
      price,
      description,
      rating,
      category,
      additionalInfo,
    });

    await newGame.save();

    res.status(201).json({ message: 'Game added successfully.', game: newGame });
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a game by ID (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, rating, category, additionalInfo } = req.body;

    // Validate input
    if (!name || !price || !description || rating === undefined || !category || !additionalInfo) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find and update the game
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { name, price, description, rating, category, additionalInfo },
      { new: true } // Return the updated document
    );

    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json({ message: 'Game updated successfully.', game: updatedGame });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a game by ID (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the game
    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json({ message: 'Game deleted successfully.', game: deletedGame });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;