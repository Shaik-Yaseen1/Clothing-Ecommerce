import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(formData);
            onClose();
        } catch (err) {
            console.error('Signup error:', err);
            const detailedError = err.response?.data?.message
                || err.response?.data?.error
                || err.message
                || 'Failed to sign up. Please try again.';
            setError(detailedError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-modal fade-in">
                <button className="auth-close" onClick={onClose}>&times;</button>
                <h2>Join TeeVibe</h2>
                <p className="auth-subtitle">Create an account to track your orders</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            className="input"
                            placeholder="+91 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <button onClick={onSwitchToLogin}>Login</button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
