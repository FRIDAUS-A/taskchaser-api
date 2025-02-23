const express = require('express');
const userRouter = express.Router();
const {
  registerUser
} = require('../controllers/user.controller');

userRouter.route('/users').post(registerUser);


module.exports = { userRouter };
