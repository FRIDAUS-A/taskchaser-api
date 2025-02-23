const joi = require('joi');

const createProductValidation = (data) => {
  const productSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().optional()
  })
  return productSchema.validate(data);
}

module.exports = {
  createProductValidation,
};
