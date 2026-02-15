import React from 'react';
import './Cart.css';

const Cart = ({ items, onUpdateQuantity, onRemove, onCheckout, isOpen, onClose }) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="cart-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <p>Your cart is empty</p>
                        <span>Add some awesome t-shirts!</span>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map((item) => (
                                <div key={item._id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />

                                    <div className="cart-item-details">
                                        <h4>{item.name}</h4>
                                        <p className="cart-item-category">{item.category}</p>
                                        <p className="cart-item-price">₹{item.price}</p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                                                disabled={item.quantity >= item.stock}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => onRemove(item._id)}
                                            title="Remove item"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Items ({itemCount})</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button className="btn btn-success checkout-btn" onClick={onCheckout}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
