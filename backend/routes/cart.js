const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  const product = require('../data/products').find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  res.json({ message: 'Added to cart', cart });
});

router.delete('/:id', (req, res) => {
  cart = cart.filter(item => item.id !== req.params.id);
  res.json({ message: 'Item removed', cart });
});

module.exports = router;