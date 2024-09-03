const Joi = require('joi');

// Define a Joi schema for stock validation
const stockSchema = Joi.object({
    product_id: Joi.number().min(1).required(),
    shop_id: Joi.number().min(1).required(),
    quantity_on_shelf: Joi.number().min(1),
    quantity_in_order: Joi.number().min(1),  
});

const changeSchema = Joi.object({
    change: Joi.number().min(0).required(),  
});

module.exports = {
  stockSchema,
  changeSchema,
};
