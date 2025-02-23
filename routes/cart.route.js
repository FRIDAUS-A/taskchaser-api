const express = require('express');
const cartRouter = express.Router();
const {
  addProductToCart,
  removeProductFromCart,
  initializeProductPayment,
  completePayment,
} = require('../controllers/cart.controller');
const { authMiddleware } = require('../middleware/auth');

cartRouter.route('/carts/:productId').post(authMiddleware, addProductToCart).delete(authMiddleware, removeProductFromCart);
cartRouter.route('/payments/initialize').get(authMiddleware, initializeProductPayment);
cartRouter.route('/payments/verify').get(authMiddleware, completePayment)


module.exports = { cartRouter };
