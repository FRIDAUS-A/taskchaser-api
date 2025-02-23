const express = require('express');
const authRouter = express.Router();
const {
  loginUser
} = require('../controllers/auth.controller');

authRouter.route('/login').post(loginUser);


module.exports = { authRouter };