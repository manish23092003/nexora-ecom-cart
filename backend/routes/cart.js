const express = require('express');
const router = express.Router();

// Mock in-memory cart (simulates DB)
let cart = [];

// GET /api/cart - Get cart items with total
router.get('/', (req, res) => {
  try {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    res.json({ 
      items: cart, 
      total: total.toFixed(2) 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  try {
    const { productId, qty } = req.body;
    
    if (!productId || !qty) {
      return res.status(400).json({ error: 'Product ID and quantity required' });
    }

    // Check if item already exists
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({
        productId,
        qty,
        name: req.body.name || 'Product',
        price: req.body.price || 0
      });
    }
    
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    cart = cart.filter(item => item.productId !== productId);
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

module.exports = router;