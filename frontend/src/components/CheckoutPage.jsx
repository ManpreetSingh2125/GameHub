import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = ({ cart, placeOrder }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const taxRate = 0.13;
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card") {
      if (
        !formData.cardNumber ||
        !formData.expiryDate ||
        !formData.cvv ||
        !formData.cardHolderName
      ) {
        alert("Please fill in all card details.");
        return;
      }
    }

    placeOrder();
    navigate("/order-confirmation", {
      state: {
        orderSummary: cart,
        customerDetails: formData,
      },
    });
  };

  return (
    <main>
      <div className="checkout-page">
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Please add items to proceed.</p>
        ) : (
          <div className="checkout-content">
            {/* Row of Two Cards */}
            <div className="cards-row">
              {/* Card 1: Order Details and Summary */}
              <div className="card order-card">
                <h2>Order Details</h2>
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
                <h3>Summary</h3>
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
              </div>

              {/* Card 2: Payment Method and Card Details */}
              <div className="card payment-card">
                <h2>Payment Method</h2>
                <div className="payment-method-options">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handlePaymentMethodChange}
                    />
                    Credit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit-card"
                      checked={formData.paymentMethod === "debit-card"}
                      onChange={handlePaymentMethodChange}
                    />
                    Debit Card
                  </label>
                </div>

                {/* Card Details (Visible for Credit Card or Debit Card) */}
                {(formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card") && (
                  <div className="card-details-section">
                    <h3>Card Details</h3>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardHolderName">Cardholder Name</label>
                      <input
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        placeholder="John Doe"
                        value={formData.cardHolderName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Details Form */}
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

            {/* Confirm Order Button */}
            <button className="pay-now-btn" onClick={handleCheckout}>
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;