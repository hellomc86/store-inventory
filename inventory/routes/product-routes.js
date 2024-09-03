const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controllers');
const validate = require('../middlewares/validationMiddleware');
const { productSchema } = require('../validation/productValidation');

router.get('/', productController.getProductsByFilter);
router.post('/', validate(productSchema), productController.createProduct);

module.exports = router;
