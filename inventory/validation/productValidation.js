const Joi = require('joi');

// Define a Joi schema for product validation
const productSchema = Joi.object({
  plu: Joi.string().min(1).max(50).required(),
  name: Joi.string().min(1).max(255).required(),
});

module.exports = {
  productSchema,
};
