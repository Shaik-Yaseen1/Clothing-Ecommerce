import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
    return (
        <div className="product-card card fade-in">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
                <span className="product-category badge">{product.category}</span>
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-details">
                    <div className="product-colors">
                        {product.colors.slice(0, 4).map((color, index) => (
                            <span
                                key={index}
                                className="color-dot"
                                style={{
                                    background: color.toLowerCase() === 'white' ? '#f8f9fa' :
                                        color.toLowerCase() === 'black' ? '#1a1a1a' :
                                            color.toLowerCase() === 'navy' ? '#001f3f' :
                                                color.toLowerCase() === 'gray' || color.toLowerCase() === 'heather gray' ? '#6c757d' :
                                                    color.toLowerCase() === 'burgundy' ? '#800020' :
                                                        color.toLowerCase() === 'forest green' ? '#228B22' :
                                                            color.toLowerCase() === 'charcoal' ? '#36454F' :
                                                                color.toLowerCase()
                                }}
                                title={color}
                            />
                        ))}
                    </div>

                    <div className="product-sizes">
                        {product.sizes.map((size, index) => (
                            <span key={index} className="size-badge">{size}</span>
                        ))}
                    </div>
                </div>

                <div className="product-footer">
                    <div className="product-price">₹{product.price}</div>
                    <div className="product-stock">
                        {product.stock > 0 ? (
                            <span className="in-stock">In Stock ({product.stock})</span>
                        ) : (
                            <span className="out-of-stock">Out of Stock</span>
                        )}
                    </div>
                </div>

                <div className="product-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Add to Cart
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => onBuyNow(product)}
                        disabled={product.stock === 0}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
