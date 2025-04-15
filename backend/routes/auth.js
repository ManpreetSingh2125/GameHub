import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        message: user.email === email ? 'Email already exists' : 'Username already taken',
      });
    }

    // Create a new user
    user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token and user details
    res.status(201).json({
      token,
      user: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    let isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Optional: Handle unhashed password for migration
      if (password === user.password) {
        // Unhashed password detected - hash and save
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        console.log(`Migrated password for user: ${user.email}`);
        isMatch = true; // Allow login after migration
      } else {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token and user details
    res.json({
      token,
      user: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;