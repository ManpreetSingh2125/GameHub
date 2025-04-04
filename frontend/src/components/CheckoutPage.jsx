import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import api from "../api";
import "./CheckoutPage.css";

// Load Stripe with your Publishable Key
const stripePromise = loadStripe(
  "pk_test_51R8aoaDCkaJlxmEzniaexJJJaYyINbr8LmNZ1RhUOOHPUwju7QkJxewmpCdaOrJOMytkvSgsrTpip7sYYpzi0zsC00L56a9XWq"
);

const CheckoutPage = ({ cart, placeOrder }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the checkout process
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Create a payment intent on the backend
      const response = await api.post("/api/payment/create-payment-intent", {
        totalAmount: totalPrice,
        customerDetails: formData,
      });

      const stripe = await stripePromise;

      // Redirect to Stripe's payment page
      const { error } = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: {
            card: {
              token: "tok_visa", // Test token for development
            },
            billing_details: {
              name: formData.name,
              email: formData.email,
            },
          },
        }
      );

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else {
        alert("Payment successful!");
        placeOrder(); // Clear the cart after successful payment
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="checkout-page">
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Please add items to proceed.</p>
        ) : (
          <div className="checkout-content">
            {/* Cart Summary Section */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Qty: {item.quantity || 1}</span>
                    <span className="item-price">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="checkout-form-container">
              <h2>Shipping Details</h2>
              <form className="checkout-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Shipping Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>

            {/* Pay Now Button */}
            <button
              className="pay-now-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;