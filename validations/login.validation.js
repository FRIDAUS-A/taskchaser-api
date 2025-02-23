const joi = require('joi');

const loginValidation = (data) => {
  const userSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  })
  return userSchema.validate(data);
}

module.exports = {
  loginValidation,
};
