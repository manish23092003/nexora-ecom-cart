# Nexora E-Commerce Cart - Full Stack Assignment

A full-stack shopping cart application built with React, Node.js/Express for Vibe Commerce internship screening.

## Features

### Backend APIs
- GET /api/products - Fetch 8 mock products
- POST /api/cart - Add items to cart
- DELETE /api/cart/:id - Remove items
- GET /api/cart - Get cart with total
- POST /api/checkout - Generate mock receipt

### Frontend Features
- Responsive product grid
- Add to cart functionality
- Cart view with item management
- Quantity update controls
- Remove items from cart
- Checkout form (name/email)
- Mock receipt display

## Tech Stack

- **Frontend**: React, Axios, CSS3
- **Backend**: Node.js, Express
- **Database**: Mock in-memory storage

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. Clone repository
2. Install backend dependencies:
```bash
cd backend
npm install
npm run dev
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
npm start
```

4. Open browser at `http://localhost:3000`

## API Endpoints

- `GET /api/products` - Returns array of products
- `GET /api/cart` - Get cart items and total
- `POST /api/cart` - Add item (body: {productId, name, price, qty})
- `DELETE /api/cart/:id` - Remove item
- `POST /api/checkout` - Process order

## Project Structure
```
nexora-ecom-cart/
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   └── cart.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md
```