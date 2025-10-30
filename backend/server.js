const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Mock checkout endpoint
app.post('/api/checkout', (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  res.json({
    success: true,
    receipt: {
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      items: cartItems
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});