import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderSummary, customerDetails } = location.state || {};

  if (!orderSummary || !customerDetails) {
    return (
      <main>
        <div className="order-confirmation-page">
          <p>No order details found. Please go back and complete your purchase.</p>
        </div>
      </main>
    );
  }

  // Calculate subtotal, tax, and total
  const subtotal = orderSummary.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const taxRate = 0.13; // 13% tax rate, matching CheckoutPage
  const taxAmount = subtotal * taxRate;
  const totalPrice = subtotal + taxAmount;

  const invoiceNumber = Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString();

  const handlePrintInvoice = () => {
    // Open a new window for printing to isolate styles
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #fff;
              color: #000;
              margin: 20mm;
              padding: 0;
            }
            .invoice-wrapper {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 30mm;
              border-bottom: 1px solid #000;
              padding-bottom: 10mm;
            }
            .invoice-header h1 {
              font-size: 24pt;
              margin: 0;
            }
            .invoice-info p {
              font-size: 12pt;
              margin: 5mm 0;
            }
            .invoice-customer-details,
            .invoice-order-summary {
              margin-bottom: 30mm;
            }
            .invoice-customer-details h2,
            .invoice-order-summary h2 {
              font-size: 16pt;
              margin-bottom: 15mm;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5mm;
            }
            .invoice-customer-details p {
              font-size: 12pt;
              margin: 10mm 0;
              line-height: 1.5;
            }
            .order-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20mm;
            }
            .order-table th,
            .order-table td {
              border: 1px solid #000;
              padding: 8mm;
              text-align: left;
              font-size: 11pt;
            }
            .order-table th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            .price-breakdown {
              text-align: right;
              margin-top: 10mm;
            }
            .price-breakdown div {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10mm;
              font-size: 12pt;
            }
            .total span:last-child {
              font-weight: bold;
            }
            .invoice-footer {
              text-align: center;
              margin-top: 30mm;
              border-top: 1px solid #000;
              padding-top: 10mm;
            }
            .invoice-footer p {
              font-size: 10pt;
              margin: 5mm 0;
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            <header class="invoice-header">
              <div class="invoice-info">
                <h1>Invoice</h1>
                <p><strong>Invoice Number:</strong> #${invoiceNumber}</p>
                <p><strong>Date:</strong> ${currentDate}</p>
              </div>
            </header>

            <section class="invoice-customer-details">
              <h2>Billing Information</h2>
              <p><strong>Name:</strong> ${customerDetails.name}</p>
              <p><strong>Email:</strong> ${customerDetails.email}</p>
              <p><strong>Shipping Address:</strong> ${customerDetails.address}</p>
            </section>

            <section class="invoice-order-summary">
              <h2>Order Summary</h2>
              <table class="order-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderSummary
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity || 1}</td>
                      <td>$${item.price.toFixed(2)}</td>
                      <td>$${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              <div class="price-breakdown">
                <div class="subtotal">
                  <span>Subtotal:</span>
                  <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="tax">
                  <span>Tax (13%):</span>
                  <span>$${taxAmount.toFixed(2)}</span>
                </div>
                <div class="total">
                  <span><strong>Total:</strong></span>
                  <span>$${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </section>

            <footer class="invoice-footer">
              <p>Thank you for shopping with us!</p>
              <p>If you have any questions, please contact us at support@gamestore.com.</p>
            </footer>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <main>
      <div className="order-confirmation-page">
        <h1>Order Confirmation</h1>

        {/* Invoice Content (Hidden on Screen) */}
        <div id="invoice-content" className="print-only">
          {/* Content is now generated in the print window */}
        </div>

        {/* Page Content */}
        <div className="confirmation-content">
          <div className="cards-row">
            {/* Card 1: Order Details and Summary */}
            <div className="card order-card">
              <h2>Order Details</h2>
              <ul className="order-items">
                {orderSummary.map((item) => (
                  <li key={item._id} className="order-item">
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
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Customer Details */}
            <div className="card customer-card">
              <h2>Shipping Details</h2>
              <div className="customer-info">
                <p>
                  <strong>Name:</strong> {customerDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {customerDetails.email}
                </p>
                <p>
                  <strong>Address:</strong> {customerDetails.address}
                </p>
              </div>
            </div>
          </div>

          <p className="thank-you-message">Thank you for your purchase!</p>

          <button className="print-invoice-btn" onClick={handlePrintInvoice}>
            Print Invoice
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;