import React, { useEffect, useState } from 'react';
import api from '../api';
import './GamesPage.css';

// Import the game images statically
import g1Image from '../components/img/g1.png'; // Cyberpunk 2077
import g2Image from '../components/img/g2.png'; // The Witcher 3
import g3Image from '../components/img/g3.png'; // Red Dead Redemption 2
import g4Image from '../components/img/g4.png'; // Red Dead Redemption 2


const GamesPage = ({ addToCart }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping of game names to their respective images
  const gameImages = {
    'Cyberpunk 2077': g1Image,
    'The Witcher 3': g2Image,
    'Red Dead Redemption 2': g3Image,
    "Marvel's Spider-Man": g4Image,

  };

  useEffect(() => {
    // Fetch games from the backend
    api.get('/api/games')
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch games.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="games-page">
        <h1>Available Games</h1>
        <div className="game-list">
          {games.map((game) => (
            <div key={game._id} className="game-card">
              {/* Use the mapped image based on the game name */}
              <img
                src={gameImages[game.name] || 'https://via.placeholder.com/200'} // Fallback image if name doesn't match
                alt={game.name}
              />
              <h3>{game.name}</h3>
              <p className="description">{game.description}</p>
              <p className="price">${game.price}</p>
              <p className="rating">Rating: {game.rating}/5</p>
              <button onClick={() => addToCart(game)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GamesPage;