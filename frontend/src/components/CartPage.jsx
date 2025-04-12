import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = ({ cart, removeFromCart, updateCart }) => {
  const navigate = useNavigate();

  // Calculate subtotal considering quantities
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Calculate tax (13% of subtotal)
  const taxRate = 0.13; // 13%
  const taxAmount = subtotal * taxRate;

  // Calculate total (subtotal + tax)
  const totalAmount = subtotal + taxAmount;

  // Handle quantity increment
  const handleIncrement = (id, currentQuantity) => {
    updateCart(id, currentQuantity + 1);
  };

  // Handle quantity decrement
  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCart(id, currentQuantity - 1);
    }
  };

  // Navigate to Checkout Page
  const handleProceedToCheckout = () => {
    navigate("/checkout"); // Adjust the path based on your routing setup
  };

  return (
    <main>
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleDecrement(item._id, item.quantity || 1)
                      }
                      disabled={(item.quantity || 1) === 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity || 1}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleIncrement(item._id, item.quantity || 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Subtotal, Tax, and Total */}
            <div className="price-breakdown">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="tax">
                <span>Tax (13%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              className="pay-now-btn"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;