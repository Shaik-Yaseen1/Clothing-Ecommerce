import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../services/api';
import './ProductCatalog.css';

const ProductCatalog = ({ onAddToCart, onBuyNow }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            const currentUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            let errorMsg = err.response
                ? `Server Error (${err.response.status}): Failed to fetch from ${currentUrl}`
                : `Network Error: Cannot reach the backend at ${currentUrl}.`;

            if (err.response?.status === 404) {
                errorMsg += ". (TIP: This usually means you missed '/api' at the end of your VITE_API_URL in Netlify!)";
            }

            if (currentUrl.includes('localhost') && window.location.hostname !== 'localhost') {
                errorMsg += " (TIP: Your live site is still trying to connect to 'localhost'.)";
            }

            setError(errorMsg);
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Classic', 'Premium', 'Graphic'];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading amazing t-shirts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={fetchProducts}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <div className="catalog-title-section">
                    <h1>Premium T-Shirt Collection</h1>
                    <p className="catalog-subtitle">
                        Discover our curated selection of high-quality tees
                    </p>
                </div>

                <div className="catalog-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid grid grid-cols-3">
                {filteredProducts.map((product, index) => (
                    <div key={product._id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <ProductCard
                            product={product}
                            onAddToCart={onAddToCart}
                            onBuyNow={onBuyNow}
                        />
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-products">
                    <p>No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
