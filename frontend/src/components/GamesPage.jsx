import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./GamesPage.css";

// Import the game images statically
import g1Image from "../components/img/g1.png"; // Cyberpunk 2077
import g2Image from "../components/img/g2.png"; // The Witcher 3
import g3Image from "../components/img/g3.png"; // Red Dead Redemption 2
import g4Image from "../components/img/g4.png"; // Marvel's Spider-Man
import g5Image from "../components/img/g5.png"; // Assassin's Creed Valhalla
import g6Image from "../components/img/g6.png"; // Assassin's Creed Valhalla
import g7Image from "../components/img/g7.png"; // Assassin's Creed Valhalla
import g8Image from "../components/img/g8.png"; // Assassin's Creed Valhalla
import g9Image from "../components/img/g9.png"; // Assassin's Creed Valhalla
import g10Image from "../components/img/g10.png"; // Assassin's Creed Valhalla
import g11Image from "../components/img/g11.png"; // Assassin's Creed Valhalla
import g12Image from "../components/img/g12.png"; // Assassin's Creed Valhalla


const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Current selected category

  // Mapping of game names to their respective images
  const gameImages = {
    "Cyberpunk 2077": g1Image,
    "The Witcher 3": g2Image,
    "Red Dead Redemption 2": g3Image,
    "Marvel's Spider-Man": g4Image,
    "Assassin's Creed Valhalla": g5Image,
    "Fortnite": g6Image,
    "Minecraft": g7Image,
    "Breath of the Wild": g8Image,
    "Resident Evil Village": g9Image,
    'Halo Infinite': g10Image,
    'Final Fantasy XV': g11Image,
    'Overwatch 2': g12Image,
  };

  useEffect(() => {
    // Fetch games from the backend
    api.get("/api/games")
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch games.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter games based on the selected category
  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  // Handle dropdown change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <main>
      <div className="games-page">
        {/* Dropdown for Filtering */}
        <div className="filter-dropdown">
          <label htmlFor="category">Filter by Category: </label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>

        {/* Game List */}
        <h1>Available Games</h1>
        <div className="game-list">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game._id} className="game-card">
                {/* Use the mapped image based on the game name */}
                <Link to={`/games/${game._id}`} className="game-link">
                  <img
                    src={gameImages[game.name] || "https://via.placeholder.com/200"}
                    alt={game.name}
                  />
                  <h3>{game.name}</h3>
                </Link>
                <p className="description">{game.description}</p>
                <p className="price">${game.price}</p>
                <p className="rating">Rating: {game.rating}/5</p>
                <Link to={`/games/${game._id}`}>
                  <button className="view-details-btn">View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No games available in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default GamesPage;