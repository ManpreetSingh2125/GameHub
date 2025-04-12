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

const seedGames = [
  { 
    name: 'Cyberpunk 2077', 
    price: 59, 
    description: 'An open-world RPG set in a dystopian future.', 
    rating: 3.9,
    category: 'RPG' // Category added here
  },
  { 
    name: 'The Witcher 3', 
    price: 39, 
    description: 'A story-driven open-world RPG.', 
    rating: 4.9,
    category: 'RPG' // Category added here
  },
  { 
    name: 'Red Dead Redemption 2', 
    price: 49, 
    description: 'A cinematic experience in the Wild West.', 
    rating: 4.8,
    category: 'Adventure' // Category added here
  },
  { 
    name: "Marvel's Spider-Man", 
    price: 200, 
    description: 'Open-world third-person action-adventure game, in which the player controls Peter Parker',
    rating: 4.8,
    category: 'Action' // Category added here
  },
  {
    name: "Assassin's Creed Valhalla",
    price: 59,
    description: 'An action-adventure game set in the Viking Age.',
    rating: 4.5,
    category: 'Action' // Category added here
  },
  {
    name: 'Fortnite',
    price: 0,
    description: 'A battle royale game with creative building mechanics.',
    rating: 4.3,
    category: 'Action' // Category added here
  },
  {
    name: 'Minecraft',
    price: 26.95,
    description: 'A sandbox game focusing on creativity and survival.',
    rating: 4.7,
    category: 'Adventure' // Category added here
  },
  {
    name: 'Breath of the Wild',
    price: 59.99,
    description: 'An open-world action-adventure game set in Hyrule.',
    rating: 4.9,
    category: 'Adventure' // Category added here
  },
  {
    name: 'Resident Evil Village',
    price: 59.99,
    description: 'A survival horror game featuring intense gameplay.',
    rating: 4.6,
    category: 'Action' // Category added here
  },
  {
    name: 'Halo Infinite',
    price: 69.99,
    description: 'A first-person shooter in the Halo franchise.',
    rating: 4.4,
    category: 'Action' // Category added here
  },
  {
    name: 'Final Fantasy XV',
    price: 19.99,
    description: 'A role-playing game with an epic storyline.',
    rating: 4.2,
    category: 'RPG' // Category added here
  },
  {
    name: 'Overwatch 2',
    price: 0,
    description: 'A team-based multiplayer first-person shooter.',
    rating: 4.5,
    category: 'Action' // Category added here
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
  { 
    name: 'Monitor Stand', 
    price: 59, 
    description: 'Adjustable monitor stand with RGB lighting and USB ports.', 
    rating: 4.4 
  },
  { 
    name: 'Gaming Chair', 
    price: 35, 
    description: 'gaming chair with adjustable lumbar support , enhancing comfort.', 
    rating: 4.6 
  },
  { 
    name: 'VR Headset Adapter', 
    price: 79, 
    description: 'Adapter for connecting VR headsets to gaming consoles.', 
    rating: 4.7 
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    // await User.deleteMany();
    await Console.deleteMany();
    await Game.deleteMany();
    await Accessory.deleteMany();

    // Insert seed data
    // await User.insertMany(seedUsers);
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