# TeeVibe - Premium T-shirt E-commerce Store

A modern MERN stack e-commerce application for selling premium t-shirts with a beautiful dark-themed UI.

## Features

- 🎨 **Modern UI** - Dark theme with glassmorphism effects and smooth animations
- 👕 **3 T-shirt Categories** - Classic, Premium, and Graphic tees
- 🛒 **Shopping Cart** - Sidebar cart with quantity management
- 💳 **Cash on Delivery** - Simple checkout with COD payment option
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- CORS enabled
- RESTful API

### Frontend
- React 18
- Vite
- Axios for API calls
- Modern CSS with custom design system

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone or Navigate to Project

```bash
cd c:\Users\USER\Desktop\T-shirt
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured for local MongoDB
# If using MongoDB Atlas, update MONGODB_URI in .env file

# Seed the database with sample products
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd c:\Users\USER\Desktop\T-shirt\frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. **Browse Products** - View the 3 types of t-shirts on the homepage
2. **Filter by Category** - Use the category filters (All, Classic, Premium, Graphic)
3. **Add to Cart** - Click "Add to Cart" to add items to your shopping cart
4. **Buy Now** - Click "Buy Now" to go directly to checkout
5. **Manage Cart** - Open cart sidebar to adjust quantities or remove items
6. **Checkout** - Fill in delivery details and place order with Cash on Delivery
7. **Order Confirmation** - Receive order confirmation with Order ID

## Project Structure

```
T-shirt/
├── backend/
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   └── Order.js         # Order schema
│   ├── routes/
│   │   ├── productRoutes.js # Product API endpoints
│   │   └── orderRoutes.js   # Order API endpoints
│   ├── server.js            # Express server
│   ├── seedProducts.js      # Database seeding script
│   ├── package.json
│   └── .env                 # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductCatalog.jsx  # Product listing
    │   │   ├── ProductCard.jsx     # Individual product card
    │   │   ├── Cart.jsx            # Shopping cart sidebar
    │   │   └── Checkout.jsx        # Checkout form
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── App.jsx                 # Main app component
    │   ├── App.css
    │   ├── index.css               # Design system
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders

## Database Schema

### Product
- name, description, price
- category (Classic, Premium, Graphic)
- image URL
- sizes, colors
- stock quantity

### Order
- Customer info (name, email, phone)
- Delivery address
- Order items with quantities
- Total amount
- Payment method (Cash on Delivery)
- Order status

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running locally
- Or update `.env` with your MongoDB Atlas connection string

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Errors
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

## Future Enhancements

- User authentication
- Order tracking
- Product reviews and ratings
- Multiple payment methods
- Admin dashboard
- Email notifications

## License

MIT License - Feel free to use this project for learning and development!
