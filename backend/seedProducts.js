import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
    {
        name: 'Classic Cotton Tee',
        description: 'Timeless comfort meets everyday style. Made from 100% premium cotton for breathable, all-day wear. Perfect for any casual occasion.',
        price: 599,
        category: 'Classic',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy', 'Gray'],
        stock: 50,
        featured: true
    },
    {
        name: 'Premium Polo Shirt',
        description: 'Elevate your wardrobe with this sophisticated polo. Crafted from premium pique fabric with a modern slim fit. Ideal for smart-casual settings.',
        price: 1299,
        category: 'Premium',
        image: '/images/premium-polo.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Burgundy', 'Forest Green', 'Charcoal'],
        stock: 30,
        featured: true
    },
    {
        name: 'Graphic Print Tee',
        description: 'Express yourself with bold, artistic designs. High-quality screen printing on soft cotton blend fabric. Stand out from the crowd.',
        price: 799,
        category: 'Graphic',
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Heather Gray'],
        stock: 40,
        featured: true
    },
    {
        name: 'V-Neck Essential Tee',
        description: 'A wardrobe staple with a flattering V-neckline. Soft, lightweight fabric perfect for layering or wearing solo. Versatile and comfortable.',
        price: 649,
        category: 'Classic',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Gray', 'Olive'],
        stock: 45,
        featured: false
    },
    {
        name: 'Striped Casual Tee',
        description: 'Classic stripes never go out of style. Comfortable cotton blend with a relaxed fit. Perfect for weekend outings and casual Fridays.',
        price: 749,
        category: 'Classic',
        image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy-White', 'Black-Gray', 'Red-White'],
        stock: 35,
        featured: false
    },
    {
        name: 'Luxury Henley Shirt',
        description: 'Premium henley with button placket detail. Made from ultra-soft pima cotton. Sophisticated casual style that transitions from day to night.',
        price: 1499,
        category: 'Premium',
        image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Charcoal', 'Navy', 'Burgundy', 'Cream'],
        stock: 25,
        featured: true
    },
    {
        name: 'Designer Crew Neck',
        description: 'Elevated basics with premium construction. Tailored fit with reinforced seams. The perfect blend of luxury and comfort.',
        price: 1699,
        category: 'Premium',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Camel', 'Sage'],
        stock: 20,
        featured: false
    },
    {
        name: 'Urban Street Art Tee',
        description: 'Bold street art graphics that make a statement. Limited edition prints on premium cotton. For those who dare to be different.',
        price: 899,
        category: 'Graphic',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White'],
        stock: 30,
        featured: true
    },
    {
        name: 'Vintage Band Tee',
        description: 'Retro-inspired graphics with a worn-in feel. Soft-washed fabric for instant comfort. Rock your favorite vintage vibes.',
        price: 849,
        category: 'Graphic',
        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=600&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Charcoal', 'Faded Blue'],
        stock: 35,
        featured: false
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('✅ Successfully seeded 9 t-shirt products');

        console.log('\n📦 Products added:');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.price} (${product.category})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
