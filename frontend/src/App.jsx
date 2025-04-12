import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
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
import AdminProtectedRoute from "./components/AdminProtectedRoute";

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
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/consoles"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <ConsolesPage addToCart={addToCart} />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/games"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <GamesPage addToCart={addToCart} />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/games/:id"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <GameDetailsPage addToCart={addToCart} />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/accessories"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <AccessoriesPage addToCart={addToCart} />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <CheckoutPage cart={cart} placeOrder={placeOrder} />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <>
              {user && <Navbar cart={cart} logout={logout} user={user} />}
              <AdminProtectedRoute user={user}>
                <AdminDashboard />
              </AdminProtectedRoute>
              {user && <Footer />}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;