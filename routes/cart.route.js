const express = require('express');
const router = express.Router();
const {
  getCarts,
  getCartByUser,
  addToCart,
  updateCartItem,
  removeCartItem,
  deleteCart,
} = require('../controllers/cart.controllers.js');

router.get('/', getCarts);

router.get('/:userId', getCartByUser);

router.post('/add', addToCart);

router.put('/update', updateCartItem);

router.delete('/remove', removeCartItem);

router.delete('/:userId', deleteCart);

module.exports = router;
