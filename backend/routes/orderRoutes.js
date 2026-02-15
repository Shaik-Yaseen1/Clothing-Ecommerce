import express from 'express';
import Order from '../models/Order.js';
import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            address,
            items,
            totalAmount
        } = req.body;

        const order = new Order({
            customerName,
            email,
            phone,
            address,
            items,
            totalAmount,
            paymentMethod: 'Cash on Delivery',
            user: req.user ? req.user.userId : null
        });

        const savedOrder = await order.save();
        res.status(201).json({
            message: 'Order placed successfully!',
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
});

// Get logged in user's orders
router.get('/my/orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your orders', error: error.message });
    }
});

// Get all orders (Admin Only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update order status (Admin Only)
router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

export default router;
