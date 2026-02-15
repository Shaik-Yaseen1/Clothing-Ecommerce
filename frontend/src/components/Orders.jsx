import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders = ({ isOpen, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        if (isOpen && token) {
            fetchOrders();
        } else if (isOpen && !token) {
            setLoading(false);
            setOrders([]);
        }
    }, [isOpen, token]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/orders/my/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': '#feca57',
            'Confirmed': '#4ecdc4',
            'Shipped': '#45b7d1',
            'Delivered': '#00b894',
            'Cancelled': '#ff6b6b'
        };
        return colors[status] || '#636e72';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="orders-overlay" onClick={onClose}></div>

            <div className={`orders-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="orders-header">
                    <h2>My Orders</h2>
                    <button className="orders-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {loading ? (
                    <div className="orders-loading">
                        <div className="spinner"></div>
                        <p>Loading your orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="orders-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <p>No orders yet</p>
                        <span>Start shopping to see your orders here!</span>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                                <div className="order-header-info">
                                    <div className="order-id">
                                        <strong>Order ID:</strong> {order._id.slice(-8).toUpperCase()}
                                    </div>
                                    <div
                                        className="order-status"
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                <div className="order-date">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {formatDate(order.orderDate)}
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <strong>₹{order.totalAmount}</strong>
                                    </div>
                                    <div className="order-payment">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                            <line x1="1" y1="10" x2="23" y2="10" />
                                        </svg>
                                        {order.paymentMethod}
                                    </div>
                                </div>

                                <div className="order-address">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>
                                        {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Orders;
