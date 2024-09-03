const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock-controllers');
const validate = require('../middlewares/validationMiddleware');
const { stockSchema, changeSchema } = require('../validation/stockValidation');


router.get('/', stockController.getStocksByFilter);
router.post('/', validate(stockSchema), stockController.createStock);
router.patch('/shelf/increase/:id', validate(changeSchema), stockController.IncreaseShelf);
router.patch('/shelf/decrease/:id', validate(changeSchema), stockController.DecreaseShelf);
router.patch('/order/increase/:id', validate(changeSchema), stockController.IncreaseOrder);
router.patch('/order/decrease/:id', validate(changeSchema), stockController.DecreaseOrder);

module.exports = router;
