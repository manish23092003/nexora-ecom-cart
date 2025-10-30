import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      setCart(response.data.items);
      setTotal(response.data.total);
    } catch (err) {
      setError('Failed to load cart');
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post(`${API_URL}/cart`, {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      });
      fetchCart();
      alert('Added to cart!');
    } catch (err) {
      setError('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API_URL}/cart/${productId}`);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const updateQuantity = async (item, change) => {
    const newQty = item.qty + change;
    if (newQty <= 0) {
      removeFromCart(item.productId);
    } else {
      const updatedCart = cart.map(cartItem =>
        cartItem.productId === item.productId
          ? { ...cartItem, qty: newQty }
          : cartItem
      );
      setCart(updatedCart);
      const newTotal = updatedCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      setTotal(newTotal.toFixed(2));
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/checkout`, {
        cartItems: cart,
        customer: formData
      });
      
      setReceipt(response.data.receipt);
      setCart([]);
      setTotal(0);
      setFormData({ name: '', email: '' });
      setShowCheckout(false);
      setShowCart(false);
    } catch (err) {
      setError('Checkout failed');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Vibe Commerce</h1>
        <button onClick={() => setShowCart(!showCart)} className="cart-btn">
          🛒 Cart ({cart.length}) - ${total}
        </button>
      </header>

      {error && <div className="error">{error}</div>}

      {receipt && (
        <div className="receipt">
          <h2>Order Confirmed! 🎉</h2>
          <p><strong>Total:</strong> ${receipt.total}</p>
          <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={() => setReceipt(null)}>Close</button>
        </div>
      )}

      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price} × {item.qty} = ${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <div className="cart-actions">
                      <button onClick={() => updateQuantity(item, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQuantity(item, 1)}>+</button>
                      <button onClick={() => removeFromCart(item.productId)}>🗑️</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total: ${total}</h3>
                  <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
                </div>
              </>
            )}
            <button onClick={() => setShowCart(false)}>Close</button>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-content">
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <button type="submit">Complete Order</button>
              <button type="button" onClick={() => setShowCheckout(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;