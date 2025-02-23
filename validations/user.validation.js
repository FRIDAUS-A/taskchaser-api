const joi = require('joi');

const createUserValidation = (data) => {
  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().optional(),
    password: joi.string().required(),
  })
  return userSchema.validate(data);
}

module.exports = {
  createUserValidation,
};