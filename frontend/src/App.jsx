import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ConsolesPage from "./components/ConsolesPage";
import GamesPage from "./components/GamesPage";
import AccessoriesPage from "./components/AccessoriesPage";
import AuthPage from "./components/AuthPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import AdminPage from "./components/AdminPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.userId, isAdmin: payload.isAdmin });
    }
  }, []);

  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem._id === item._id);
    if (exists) {
      alert("Item already in cart!");
      return;
    }
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateCart = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to place an order.");
      return;
    }

    alert("Order placed successfully!");
    setCart([]);
  };

  const isAdminRouteAccessible = () => {
    return user && user.isAdmin ? <AdminPage /> : <Navigate to="/" />;
  };

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/consoles"
          element={<ConsolesPage addToCart={addToCart} />}
        />
        <Route
          path="/games"
          element={<GamesPage addToCart={addToCart} />}
        />
        <Route
          path="/accessories"
          element={<AccessoriesPage addToCart={addToCart} />}
        />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateCart={updateCart} // Ensure this is passed correctly
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} placeOrder={placeOrder} />}
        />
        <Route path="/admin" element={isAdminRouteAccessible()} />
      </Routes>
    </Router>
  );
}

export default App;