import React, { useState } from 'react';
import './Checkout.css';
import logo from '../assets/logo.png';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle payment processing here
    console.log('Order submitted:', formData);
    alert('Thank you for your order! Your payment has been processed.');
    // You might navigate the user to an order confirmation page here
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <div className="logo-container">
          <img src={logo} alt="Farm Pharma Logo" className="logo" />
        </div>
        <h2 className="checkout-title">Checkout</h2>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Shipping Information Section */}
          <div className="form-section">
            <h3 className="section-title">Shipping Information</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter postal code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="form-section">
            <h3 className="section-title">Payment Information</h3>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="•••• •••• •••• ••••"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="Enter name on card"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="•••"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="checkout-button">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;