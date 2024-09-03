const Joi = require('joi');

// Create a validation middleware function
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      // If validation fails, respond with a 400 status and the validation error message
      return res.status(400).json({ error: error.details[0].message });
    }

    // If validation passes, move on to the next middleware or route handler
    next();
  };
};

module.exports = validate;
