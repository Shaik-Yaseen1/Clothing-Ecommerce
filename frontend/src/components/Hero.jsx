import React from 'react';
import './Hero.css';

const Hero = ({ onShopNow }) => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-badge">New Collection 2026</span>
                    <h1 className="hero-title">
                        Discover Your Perfect
                        <span className="hero-highlight"> T-Shirt Style</span>
                    </h1>
                    <p className="hero-description">
                        Premium quality tees designed for comfort and style.
                        From classic basics to bold graphics, find your perfect match.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-large" onClick={onShopNow}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Shop Now
                        </button>
                        <button className="btn btn-secondary btn-large">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            View Collection
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <h3>500+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat">
                            <h3>3</h3>
                            <p>Premium Categories</p>
                        </div>
                        <div className="stat">
                            <h3>100%</h3>
                            <p>Quality Guaranteed</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="image-card card-1">
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" alt="Classic Tee" />
                        <div className="image-label">Classic</div>
                    </div>
                    <div className="image-card card-2">
                        <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop" alt="Graphic Tee" />
                        <div className="image-label">Graphic</div>
                    </div>
                    <div className="image-card card-3">
                        <img src="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop" alt="Premium Tee" />
                        <div className="image-label">Premium</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
