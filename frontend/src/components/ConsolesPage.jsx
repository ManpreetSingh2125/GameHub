import React, { useEffect, useState } from 'react';
import api from '../api';
import './ConsolesPage.css';

// Import the images statically
import c1Image from '../components/img/c1.png'; // PlayStation 5
import c2Image from '../components/img/c2.png'; // Xbox Series X
import c3Image from '../components/img/c3.png'; // Nintendo Switch

const ConsolesPage = ({ addToCart }) => {
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping of console names to their respective images
  const consoleImages = {
    'PlayStation 5': c1Image,
    'Xbox Series X': c2Image,
    'Nintendo Switch': c3Image,
  };

  useEffect(() => {
    // Fetch consoles from the backend
    api.get('/api/consoles')
      .then((response) => {
        setConsoles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch consoles.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="consoles-page">
        <h1>Available Consoles</h1>
        <div className="console-list">
          {consoles.map((console) => (
            <div key={console._id} className="console-card">
              {/* Use the mapped image based on the console name */}
              <img
                src={consoleImages[console.name] || 'https://via.placeholder.com/150'} // Fallback image if name doesn't match
                alt={console.name}
              />
              <h3>{console.name}</h3>
              <p className="description">{console.description}</p>
              <p className="price">${console.price}</p>
              <p className="rating">Rating: {console.rating}/5</p>
              <button onClick={() => addToCart(console)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ConsolesPage;