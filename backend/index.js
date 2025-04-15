
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import Console from './models/Console.js';
import orderRoutes from './routes/orders.js';
import gameRoutes from './routes/games.js'; // Import the games route
import accessoryRoutes from './routes/accessories.js'; // Accessories route
import authMiddleware from './middleware/authMiddleware.js';


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

// Use game routes
app.use('/api/games', gameRoutes); // Updated route

// Use accessory routes
app.use('/api/accessories', accessoryRoutes);

// Use payment routes
// app.use('/api/payment', paymentRoutes);

app.use('/api/auth', authRoutes);

// Get all consoles
app.get('/api/consoles', async (req, res) => {
  try {
    const consoles = await Console.find();
    res.json(consoles);
  } catch (error) {
    console.error('Error fetching consoles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single console by ID
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

// Add a new console (protected route)
app.post('/api/admin/consoles', authMiddleware, async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Validate input
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newConsole = new Console({ name, price, description });
    await newConsole.save();

    res.status(201).json({ message: 'Console added successfully.', console: newConsole });
  } catch (error) {
    console.error('Error adding console:', error);
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