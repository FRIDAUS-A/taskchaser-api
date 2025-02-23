const { createUserValidation } = require('../validations/user.validation');
const { hashPassword } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const { Users } = require("../models/user.model");

const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  // Validate the input
  const { error } = createUserValidation(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const checkIfEmailExist = await Users.findOne({
    where: {email: email}
  });
  if (checkIfEmailExist) {
    throw new BadRequest("User with this email exists");
  }
  // hash the password
  const passwordHash = await hashPassword(password);

  await Users.create({
    userId: uuidv4(),
    name,
    email,
    phone,
    address,
    password: passwordHash,
  })
  res.status(StatusCodes.CREATED).json({
    message: "User account created",
    status: "success"
})
}

module.exports = {
  registerUser,
}
