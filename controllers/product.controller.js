const { Products } = require("../models/product.model")
const { StatusCodes } = require('http-status-codes');

const getAllProducts = async (req, res) => {
  const products = await Products.findAll();

  res.status(StatusCodes.OK).json({
    message: 'All Products',
    status: 'success',
    products,
  })
}

module.exports = {
  getAllProducts,
}
