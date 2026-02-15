import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0
    });

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchOrders();
        }
    }, [user]);

    if (authLoading) {
        return <div className="admin-loading"><div className="spinner"></div><p>Verifying admin access...</p></div>;
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="admin-error">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page. Admin privileges required.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                    <a href="/" className="btn btn-secondary">Back to Home</a>
                    <button onClick={logout} className="btn btn-primary">Try Re-logging</button>
                </div>
            </div>
        );
    }

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders');
            setOrders(response.data);
            calculateStats(response.data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('Access Denied: Your session token is outdated. Please Log Out and Log In again to refresh your permissions.');
            } else {
                setError('Failed to load orders. Please check if the server is running.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (ordersData) => {
        const stats = {
            total: ordersData.length,
            pending: ordersData.filter(o => o.status === 'Pending').length,
            confirmed: ordersData.filter(o => o.status === 'Confirmed').length,
            shipped: ordersData.filter(o => o.status === 'Shipped').length,
            delivered: ordersData.filter(o => o.status === 'Delivered').length
        };
        setStats(stats);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/orders/${orderId}`, {
                status: newStatus
            });
            fetchOrders(); // Refresh orders
        } catch (err) {
            alert('Failed to update order status');
            console.error(err);
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

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-error">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <h3>Error Loading Orders</h3>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchOrders}>Retry</button>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="btn btn-secondary" onClick={fetchOrders}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Refresh
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(254, 202, 87, 0.1)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#feca57" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.pending}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(78, 205, 196, 0.1)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.confirmed}</h3>
                        <p>Confirmed</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(0, 184, 148, 0.1)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00b894" strokeWidth="2">
                            <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
                            <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
                            <path d="M7 21h10" />
                            <path d="M12 3v18" />
                            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.delivered}</h3>
                        <p>Delivered</p>
                    </div>
                </div>
            </div>

            <div className="orders-section">
                <h2>All Orders ({orders.length})</h2>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders yet</p>
                    </div>
                ) : (
                    <div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="order-id-cell">
                                            {order._id.slice(-8).toUpperCase()}
                                        </td>
                                        <td>
                                            <div className="customer-info">
                                                <strong>{order.customerName}</strong>
                                                <span>{order.email}</span>
                                                <span>{order.phone}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="items-list">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="item-row">
                                                        {item.name} x{item.quantity}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="total-cell">₹{order.totalAmount}</td>
                                        <td>
                                            <select
                                                className="status-select"
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                style={{
                                                    backgroundColor: getStatusColor(order.status),
                                                    color: 'white'
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="date-cell">{formatDate(order.orderDate)}</td>
                                        <td>
                                            <div className="address-tooltip">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                <div className="tooltip-content">
                                                    <strong>Delivery Address:</strong>
                                                    <p>{order.address.street}</p>
                                                    <p>{order.address.city}, {order.address.state}</p>
                                                    <p>{order.address.zipCode}, {order.address.country}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
