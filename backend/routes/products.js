const express = require('express');
const router = express.Router();

// Mock products data (simulates DB)
const mockProducts = [
  { id: 1, name: 'Wireless Headphones', price: 79.99 },
  { id: 2, name: 'Smart Watch', price: 199.99 },
  { id: 3, name: 'Laptop Stand', price: 49.99 },
  { id: 4, name: 'USB-C Hub', price: 34.99 },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99 },
  { id: 6, name: 'Wireless Mouse', price: 59.99 },
  { id: 7, name: 'Monitor Light Bar', price: 89.99 },
  { id: 8, name: 'Cable Management Box', price: 24.99 }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  try {
    res.json(mockProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;