import mongoose from 'mongoose';
import Console from './models/Console.js'; // Default import for Console
import Game from './models/Game.js'; // Default import for Game
import User from './models/User.js'; // Default import for Game
import Accessory from './models/Accessory.js';


import dotenv from 'dotenv';

dotenv.config();

// Seed data for consoles
const seedConsoles = [
  { 
    name: 'PlayStation 5', 
    price: 499, 
    description: 'Next-gen console with stunning graphics and fast load times.', 
    rating: 4.8,
  },
  { 
    name: 'Xbox Series X', 
    price: 499, 
    description: 'Powerful gaming console with backward compatibility.', 
    rating: 4.7 ,
  },
  { 
    name: 'Nintendo Switch', 
    price: 299, 
    description: 'Hybrid console for both home and portable gaming.', 
    rating: 4.6,
  },
];

// Seed data for games
const seedGames = [
  { 
    name: 'Cyberpunk 2077', 
    price: 59, 
    description: 'An open-world RPG set in a dystopian future.', 
    rating: 3.9 
  },
  { 
    name: 'The Witcher 3', 
    price: 39, 
    description: 'A story-driven open-world RPG.', 
    rating: 4.9 
  },
  { 
    name: 'Red Dead Redemption 2', 
    price: 49, 
    description: 'A cinematic experience in the Wild West.', 
    rating: 4.8 
  },
  { 
    name: "Marvel's Spider-Man", 
    price: 200, 
    description: 'Open-world third-person action-adventure game, in which the player controls Peter Parker',
    rating: 4.8 
  },
];

const seedUsers = [
  {
    username: 'admin_user',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true, // Mark this user as an admin
  },
  {
    username: 'regular_user',
    email: 'user@example.com',
    password: 'password123',
    isAdmin: false, // Regular user
  },
];

const seedAccessories = [
  { 
    name: 'Wireless Controller', 
    price: 69, 
    description: 'Ergonomic wireless gaming controller.', 
    rating: 4.7 
  },
  { 
    name: 'Gaming Headset', 
    price: 89, 
    description: 'High-quality noise-canceling gaming headset.', 
    rating: 4.6 
  },
  { 
    name: 'Charging Dock', 
    price: 39, 
    description: 'Fast charging dock for controllers.', 
    rating: 4.5 
  },
  { 
    name: 'Gaming Mouse', 
    price: 49, 
    description: 'Precision gaming mouse with customizable buttons.', 
    rating: 4.8 
  },
  { 
    name: 'Keyboard', 
    price: 99, 
    description: 'Mechanical gaming keyboard with RGB lighting.', 
    rating: 4.9 
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Console.deleteMany();
    await Game.deleteMany();
    await Accessory.deleteMany();

    // Insert seed data
    await User.insertMany(seedUsers);
    await Console.insertMany(seedConsoles);
    await Game.insertMany(seedGames);
    await Accessory.insertMany(seedAccessories);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();