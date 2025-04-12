import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ConsolesPage from "./components/ConsolesPage";
import GamesPage from "./components/GamesPage";
import AccessoriesPage from "./components/AccessoriesPage";
import AuthPage from "./components/AuthPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
// import AdminPage from "./components/AdminPage";
import GameDetailsPage from "./components/GameDetailsPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
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

  // Add to Cart Function
  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem._id === item._id);
    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart!",
        text: `"${item.name}" is already in your cart.`,
        confirmButtonText: "OK",
        theme: 'dark',
      });
      return;
    }

    setCart([...cart, { ...item }]);
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `"${item.name}" has been added to your cart.`,
      confirmButtonText: "OK",
      theme: 'dark',
    });
  };

  // Remove from Cart Function
  const removeFromCart = (id) => {
    const itemToRemove = cart.find((item) => item._id === id);
    Swal.fire({
      icon: "warning",
      title: "Remove Item?",
      text: `Are you sure you want to remove "${itemToRemove.name}" from your cart?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      theme: 'dark',
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item._id !== id));
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: `"${itemToRemove.name}" has been removed from your cart.`,
          confirmButtonText: "OK",
          theme: "dark",

        });
      }
    });
  };

  // Update Cart Quantity Function
  const updateCart = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    // Update cart quantity without showing an alert
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Place Order Function
  const placeOrder = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Empty Cart!",
        text: "Your cart is empty. Please add items to proceed.",
        confirmButtonText: "OK",
        theme: 'dark',
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      confirmButtonText: "OK",
      theme: 'dark',
    }).then(() => {
      setCart([]); // Clear the cart after placing the order
    });
  };

  // Logout Function
  const logout = () => {
    Swal.fire({
      icon: "warning",
      title: "Logout?",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "Cancel",
      theme: 'dark',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setUser(null);
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          confirmButtonText: "OK",
          theme: "dark",
        });
      }
    });
  };

  // const isAdminRouteAccessible = () => {
  //   return user && user.isAdmin ? <AdminPage /> : <Navigate to="/" />;
  // };

  return (
    <Router>
      {/* Conditionally Render Navbar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/consoles"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <ConsolesPage addToCart={addToCart} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/games"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <GamesPage addToCart={addToCart} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/games/:id"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <GameDetailsPage addToCart={addToCart} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/accessories"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <AccessoriesPage addToCart={addToCart} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <CheckoutPage cart={cart} placeOrder={placeOrder} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} />}
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;