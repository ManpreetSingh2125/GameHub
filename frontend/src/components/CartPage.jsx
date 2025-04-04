import React from "react";
import "./CartPage.css";

const CartPage = ({ cart, removeFromCart, updateCart }) => {
  // Calculate total price considering quantities
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Handle quantity increment
  const handleIncrement = (id, currentQuantity) => {
    updateCart(id, currentQuantity + 1);
  };

  // Handle quantity decrement
  const handleDecrement = (id, currentQuantity) => {
    updateCart(id, currentQuantity - 1);
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
                    <span className="item-name"> {item.name} </span>
                    <span className="item-price"> ${item.price} </span>
                  </div>
                  <div className="quantity-controls">
                    
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleDecrement(item._id, item.quantity || 1)
                      }
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
            {/* Total Price */}
            <div className="total-price">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;