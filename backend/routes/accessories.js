import express from 'express';
import Accessory from '../models/Accessory.js'; // Import the Accessory model
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware for admin authentication

const router = express.Router();

// Get all accessories
router.get('/', async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    console.error('Error fetching accessories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single accessory by ID
router.get('/:id', async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: 'Accessory not found' });
    res.json(accessory);
  } catch (error) {
    console.error('Error fetching accessory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new accessory (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, rating } = req.body;

    // Validate input
    if (!name || !price || !description || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newAccessory = new Accessory({
      name,
      price,
      description,
      rating,
    });

    await newAccessory.save();

    res.status(201).json({ message: 'Accessory added successfully.', accessory: newAccessory });
  } catch (error) {
    console.error('Error adding accessory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an accessory by ID (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, rating } = req.body;

    // Validate input
    if (!name || !price || !description || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find and update the accessory
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      id,
      { name, price, description, rating },
      { new: true } // Return the updated document
    );

    if (!updatedAccessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    res.status(200).json({ message: 'Accessory updated successfully.', accessory: updatedAccessory });
  } catch (error) {
    console.error('Error updating accessory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an accessory by ID (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the accessory
    const deletedAccessory = await Accessory.findByIdAndDelete(id);

    if (!deletedAccessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    res.status(200).json({ message: 'Accessory deleted successfully.', accessory: deletedAccessory });
  } catch (error) {
    console.error('Error deleting accessory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;