import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import "./GameDetailsPage.css";

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

const GameDetailsPage = ({ addToCart }) => {
  const { id } = useParams(); // Extract the game ID from the URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

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
    "Halo Infinite": g10Image,
    "Final Fantasy XV": g11Image,
    "Overwatch 2": g12Image,
  };

  useEffect(() => {
    // Fetch game details based on the ID
    api
      .get(`/api/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch game details.");
        setLoading(false);
      });
  }, [id]);

  // Handle Add to Cart with SweetAlert2
  const handleAddToCart = () => {
    addToCart({ ...game, quantity: 1 });
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `"${game.name}" ($${game.price.toFixed(2)}) is now in your cart.`,
      confirmButtonText: "Keep Shopping",
      showCancelButton: true,
      cancelButtonText: "View Cart",
      timer: 10000, // Auto-close after 10 seconds
      timerProgressBar: true,
      theme: "dark", // Apply dark theme
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Redirect to the Cart Page
        navigate("/cart");
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="game-details-page">
      {/* Game Header */}
      <h1>{game.name}</h1>

      {/* Game Info Section */}
      <div className="game-info">
        {/* Game Image */}
        <img
          src={gameImages[game.name] || "https://via.placeholder.com/600"} // Use mapped static image or fallback
          alt={game.name}
          className="game-image"
        />

        {/* Game Details */}
        <div className="game-description">
          <p className="description">{game.description}</p>
          <p className="price">${game.price.toFixed(2)}</p>
          <p className="rating">Rating: {game.rating}/5</p>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="additional-info-section">
        <h2>Additional Information</h2>
        {game.additionalInfo ? (
          <>
            <p>
              <strong>Requirements:</strong> {game.additionalInfo.requirements}
            </p>
            <p>
              <strong>Size:</strong> {game.additionalInfo.size}
            </p>
          </>
        ) : (
          <p>No additional information available.</p>
        )}
      </div>
    </div>
  );
};

export default GameDetailsPage;
