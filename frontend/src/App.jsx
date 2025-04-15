import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate, // Import useNavigate hook
} from "react-router-dom";
import Swal from "sweetalert2";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ConsolesPage from "./components/ConsolesPage";
import GamesPage from "./components/GamesPage";
import AccessoriesPage from "./components/AccessoriesPage";
import AuthPage from "./components/AuthPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import GameDetailsPage from "./components/GameDetailsPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import AdminLoginPage from "./components/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ManageProductsPage from "./components/ManageProductsPage";
import ViewProductsPage from "./components/ViewProductsPage"; // Import ViewProductsPage

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode the token

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (payload.exp < currentTime) {
          // Token is expired, clear it
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Token is valid, set the user state including username
          setUser({
            id: payload.userId,
            isAdmin: payload.isAdmin,
            username: payload.username, // Ensure username is included in the token payload
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Clear invalid token
        setUser(null);
      }
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
        theme: "dark",
      });
      return;
    }

    setCart([...cart, { ...item }]);
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `"${item.name}" has been added to your cart.`,
      confirmButtonText: "OK",
      theme: "dark",
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
      theme: "dark",
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
        theme: "dark",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      confirmButtonText: "OK",
      theme: "dark",
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
      theme: "dark",
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

  return (
    <Router>
      {/* Navbar and Footer should wrap the entire app */}
      <>
        {user && <Navbar cart={cart} logout={logout} user={user} />}
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/admin-login"
            element={<AdminLoginPage setUser={setUser} />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consoles"
            element={
              <ProtectedRoute user={user}>
                <ConsolesPage addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute user={user}>
                <GamesPage addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/:id"
            element={
              <ProtectedRoute user={user}>
                <GameDetailsPage addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accessories"
            element={
              <ProtectedRoute user={user}>
                <AccessoriesPage addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute user={user}>
                <CheckoutPage cart={cart} placeOrder={placeOrder} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute user={user}>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedRoute user={user}>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-products"
            element={
              <AdminProtectedRoute user={user}>
                <ManageProductsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/view-products"
            element={
              <AdminProtectedRoute user={user}>
                <ViewProductsPage />
              </AdminProtectedRoute>
            }
          />
        </Routes>
        {user && <Footer />}
      </>
    </Router>
  );
}

export default App;
