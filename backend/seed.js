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
    category: 'RPG',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i7-4790 or AMD Ryzen 3 3200G, 12GB RAM, NVIDIA GTX 1060 6GB or AMD Radeon R9 Fury, 70GB storage',
      size: '70GB'
    }
  },
  {
    name: 'The Witcher 3',
    price: 39,
    description: 'A story-driven open-world RPG.',
    rating: 4.9,
    category: 'RPG',
    additionalInfo: {
      requirements: 'Windows 7/8/10 64-bit, Intel Core i5-2500K or AMD Phenom II X4 940, 6GB RAM, NVIDIA GTX 660 or AMD Radeon HD 7870, 35GB storage',
      size: '35GB'
    }
  },
  {
    name: 'Red Dead Redemption 2',
    price: 49,
    description: 'A cinematic experience in the Wild West.',
    rating: 4.8,
    category: 'Adventure',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i5-2500K or AMD FX-6300, 8GB RAM, NVIDIA GTX 770 2GB or AMD Radeon R9 280 3GB, 150GB storage',
      size: '150GB'
    }
  },
  {
    name: "Marvel's Spider-Man",
    price: 200,
    description: 'Open-world third-person action-adventure game, in which the player controls Peter Parker',
    rating: 4.8,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i5-4670 or AMD Ryzen 5 1600, 8GB RAM, NVIDIA GTX 950 or AMD Radeon RX 470, 75GB storage',
      size: '75GB'
    }
  },
  {
    name: "Assassin's Creed Valhalla",
    price: 59,
    description: 'An action-adventure game set in the Viking Age.',
    rating: 4.5,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i5-4460 or AMD Ryzen 3 1200, 8GB RAM, NVIDIA GTX 960 or AMD Radeon R9 380, 50GB storage',
      size: '50GB'
    }
  },
  {
    name: 'Fortnite',
    price: 0,
    description: 'A battle royale game with creative building mechanics.',
    rating: 4.3,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 7/8/10 64-bit, Intel Core i3-3225 or equivalent, 4GB RAM, Intel HD 4000 or equivalent, 20GB storage',
      size: '20GB'
    }
  },
  {
    name: 'Minecraft',
    price: 26.95,
    description: 'A sandbox game focusing on creativity and survival.',
    rating: 4.7,
    category: 'Adventure',
    additionalInfo: {
      requirements: 'Windows 7/8/10 64-bit, Intel Core i3-3210 or AMD A8-7600, 4GB RAM, Intel HD Graphics 4000 or equivalent, 4GB storage',
      size: '4GB'
    }
  },
  {
    name: 'Breath of the Wild',
    price: 59.99,
    description: 'An open-world action-adventure game set in Hyrule.',
    rating: 4.9,
    category: 'Adventure',
    additionalInfo: {
      requirements: 'Nintendo Switch or Wii U, 4GB RAM, 13.4GB storage',
      size: '13.4GB'
    }
  },
  {
    name: 'Resident Evil Village',
    price: 59.99,
    description: 'A survival horror game featuring intense gameplay.',
    rating: 4.6,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i5-7500 or AMD Ryzen 3 1200, 8GB RAM, NVIDIA GTX 1050 Ti or AMD Radeon RX 560, 30GB storage',
      size: '30GB'
    }
  },
  {
    name: 'Halo Infinite',
    price: 69.99,
    description: 'A first-person shooter in the Halo franchise.',
    rating: 4.4,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 10 64-bit, Intel Core i5-4440 or AMD FX-8370, 8GB RAM, NVIDIA GTX 1050 Ti or AMD Radeon RX 570, 50GB storage',
      size: '50GB'
    }
  },
  {
    name: 'Final Fantasy XV',
    price: 19.99,
    description: 'A role-playing game with an epic storyline.',
    rating: 4.2,
    category: 'RPG',
    additionalInfo: {
      requirements: 'Windows 7/8/10 64-bit, Intel Core i5-2500 or AMD FX-6100, 8GB RAM, NVIDIA GTX 760 or AMD Radeon R9 280, 100GB storage',
      size: '100GB'
    }
  },
  {
    name: 'Overwatch 2',
    price: 0,
    description: 'A team-based multiplayer first-person shooter.',
    rating: 4.5,
    category: 'Action',
    additionalInfo: {
      requirements: 'Windows 7/8/10 64-bit, Intel Core i3 or AMD Phenom X3 8650, 6GB RAM, NVIDIA GTX 600 series or AMD Radeon HD 7000 series, 50GB storage',
      size: '50GB'
    }
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
  {
    username: 'admin_user',
    email: 'manpreet@124',
    password: 'admin123',
    isAdmin: true, // Mark this user as an admin
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