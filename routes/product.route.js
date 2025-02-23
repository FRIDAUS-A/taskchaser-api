const express = require('express');
const productRouter = express.Router();
const {
  getAllProducts,
} = require('../controllers/product.controller');
const { authMiddleware } = require('../middleware/auth');

productRouter.route('/products').get(authMiddleware, getAllProducts);


module.exports = { productRouter };