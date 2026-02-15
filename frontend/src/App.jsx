import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const productsRef = useRef(null);
  const { user, logout } = useAuth();

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);

    if (!existingItem) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (response) => {
    setOrderSuccess(response);

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    existingOrders.unshift(response.order);
    localStorage.setItem('userOrders', JSON.stringify(existingOrders));

    setCartItems([]);
    setIsCheckoutOpen(false);

    setTimeout(() => {
      setOrderSuccess(null);
    }, 5000);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <span>TeeVibe</span>
          </div>

          <nav className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <button className="user-btn" onClick={() => setIsOrdersOpen(true)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{user.name}</span>
                </button>
                <button className="logout-btn" onClick={logout} title="Logout">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button className="login-trigger" onClick={() => setIsLoginOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Login</span>
              </button>
            )}

            <button
              className="cart-button"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Hero onShopNow={handleShopNow} />

        <div className="container" ref={productsRef} id="shop">
          <ProductCatalog
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
      </main>

      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          onOrderSuccess={handleOrderSuccess}
          onCancel={() => setIsCheckoutOpen(false)}
        />
      )}

      <Orders
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
      />

      <Signup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
      />

      {orderSuccess && (
        <div className="success-notification slide-in">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <strong>Order Placed Successfully!</strong>
            <p>Order ID: {orderSuccess.order._id}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
