import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import Console from './models/Console.js';
import orderRoutes from './routes/orders.js';
//import paymentRoutes from './routes/payment.js';
import Game from './models/Game.js';
import authMiddleware from './middleware/authMiddleware.js';
import Accessory from './models/Accessory.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to GameHub API!');
});

// Use order routes
app.use('/api/orders', orderRoutes);

// Use payment routes
//app.use('/api/payment', paymentRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/consoles', async (req, res) => {
    try {
      const consoles = await Console.find();
      res.json(consoles);
    } catch (error) {
      console.error('Error fetching consoles:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// Get all games
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/games', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, rating } = req.body;

    // Validate input
    if (!name || !price || !description || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newGame = new Game({ name, price, description, rating });
    await newGame.save();

    res.status(201).json({ message: 'Game added successfully.', game: newGame });
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all accessories
app.get('/api/accessories', async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    console.error('Error fetching accessories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single accessory by ID
app.get('/api/accessories/:id', async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: 'Accessory not found' });
    res.json(accessory);
  } catch (error) {
    console.error('Error fetching accessory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token with username
    const token = jwt.sign(
      { userId: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

  app.get('/api/consoles/:id', async (req, res) => {
    try {
      const console = await Console.findById(req.params.id);
      if (!console) return res.status(404).json({ message: 'Console not found' });
      res.json(console);
    } catch (error) {
      console.error('Error fetching console:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });