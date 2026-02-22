import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = ({ isOpen, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            onClose();
        } catch (err) {
            console.error('Login error:', err);
            const detailedError = err.response?.data?.message
                || err.response?.data?.error
                || err.message
                || 'Failed to login. Please check your credentials.';
            setError(detailedError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-modal fade-in">
                <button className="auth-close" onClick={onClose}>&times;</button>
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your TeeVibe account</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <button onClick={onSwitchToSignup}>Sign Up</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
