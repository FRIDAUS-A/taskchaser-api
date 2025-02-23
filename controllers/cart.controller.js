const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const { Carts } = require('../models/cart.model');
const { Products } = require('../models/product.model');
const { Users } = require('../models/user.model');
const { sendEmail } = require('../services/email.service');
const { BadRequest } = require('../errors');
const { initializePayment, verifyPayment } = require('../services/payment.service')

const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.params;
  const [product] = await Products.findAll({
    where: {
      productId,
    }
  });
  if (!product) {
    throw new BadRequest('Product does not exist');
  }
  const [checkProduct] = await Carts.findAll({
    where: {
      productId,
      userId,
    }
  });
  if (checkProduct) {
    throw new BadRequest('Product has been added to cart');
  }
  await Carts.create({
    cartId: uuidv4(),
    productId,
    userId,
  });
  res.status(StatusCodes.OK).json({
    message: 'Product added to cart',
    status: 'success',
  });
}


const removeProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.params;
  await Carts.destroy({
    where: {
      productId,
      userId,
    }
  });
  res.status(StatusCodes.NO_CONTENT).json({
    message: 'Product removed from cart',
    status: 'success',
  });
}

const initializeProductPayment = async (req, res) => {
  console.log("user", req.params);
  const { userId } = req.params;
   // Fetch all cart items with associated product details
   const carts = await Carts.findAll({
    where: { userId },
    include: [
      {
        model: Products, // Join with Products table
        attributes: ["price"], // Fetch only the price
      },
    ],
  });
  console.log(carts)
  console.log(carts.length)
  // Sum up the total price
  const totalPrice = carts.reduce((sum, cart) => sum + Number(cart.Product?.price || 0), 0);
  console.log(totalPrice)
  const user = await Users.findOne({
    where: {
      userId,
    }
  })
  const response = await initializePayment(user.email, Number(totalPrice));

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Payment initialized successfully",
    data: {
      payment_url: response.data.data.authorization_url,
      access_code: response.data.data.reference,
      price: totalPrice,
    },
  });
}

const completePayment = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const { reference, price } = req.query;
  if (!reference) throw new BadRequest("Payment reference is required");
  const response = await verifyPayment(reference);
  if (response.data.data.status !== "success") throw new BadRequest("Invalid transaction or payment failed");
  const user = await Users.findOne({
    where: {
      userId,
    }
  });
  const emailResponse = await sendEmail(user.email, price);
  if (emailResponse === 'failed') throw new BadRequest('network error');
  await Carts.destroy({
    where: {
      userId,
    }
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    message: 'payment verified',
  });
}

module.exports = {
  addProductToCart,
  removeProductFromCart,
  initializeProductPayment,
  completePayment,
}