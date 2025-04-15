const express = require('express');
const router = express.Router();
const Console = require('../models/Console'); // Import the Console model
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to verify admin access
const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

// Route to add a new console
router.post('/consoles', authenticateAdmin, async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Validate required fields
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new console instance
    const newConsole = new Console({
      name,
      price,
      description,
    });

    // Save the console to the database
    await newConsole.save();

    res.status(201).json({ message: 'Console added successfully', console: newConsole });
  } catch (error) {
    console.error('Error adding console:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all consoles
router.get('/consoles', async (req, res) => {
  try {
    const consoles = await Console.find();
    res.status(200).json({ consoles });
  } catch (error) {
    console.error('Error fetching consoles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a console by ID
router.put('/consoles/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    // Find and update the console
    const updatedConsole = await Console.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true } // Return the updated document
    );

    if (!updatedConsole) {
      return res.status(404).json({ message: 'Console not found' });
    }

    res.status(200).json({ message: 'Console updated successfully', console: updatedConsole });
  } catch (error) {
    console.error('Error updating console:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a console by ID
router.delete('/consoles/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the console
    const deletedConsole = await Console.findByIdAndDelete(id);

    if (!deletedConsole) {
      return res.status(404).json({ message: 'Console not found' });
    }

    res.status(200).json({ message: 'Console deleted successfully', console: deletedConsole });
  } catch (error) {
    console.error('Error deleting console:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;