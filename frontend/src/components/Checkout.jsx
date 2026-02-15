import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = ({ cartItems, onOrderSuccess, onCancel }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                customerName: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [user]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                customerName: formData.customerName,
                email: formData.email,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.sizes[0],
                    color: item.colors[0]
                })),
                totalAmount: total,
                paymentMethod: 'Cash on Delivery'
            };

            const response = await createOrder(orderData);
            onOrderSuccess(response);
        } catch (err) {
            setError('Failed to place order. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <button className="checkout-close" onClick={onCancel}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="checkout-content">
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3>Contact Information</h3>
                                <div className="form-group">
                                    <label htmlFor="customerName">Full Name *</label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        className="input"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="input"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Delivery Address</h3>
                                <div className="form-group">
                                    <label htmlFor="street">Street Address *</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        className="input"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                        placeholder="123 Main Street, Apartment 4B"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="input"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            placeholder="Mumbai"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="state">State *</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="input"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="zipCode">ZIP Code *</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className="input"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                            placeholder="400001"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="country">Country *</label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="input"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="payment-method">
                                <h3>Payment Method</h3>
                                <div className="payment-option selected">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                        <line x1="1" y1="10" x2="23" y2="10" />
                                    </svg>
                                    <div>
                                        <strong>Cash on Delivery</strong>
                                        <p>Pay when you receive your order</p>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            {error && (
                                <div className="error-alert">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Place Order
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cartItems.map((item) => (
                                <div key={item._id} className="summary-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="summary-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <span className="summary-item-price">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <span>Total Amount</span>
                            <span className="total-amount">₹{total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
