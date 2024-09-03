const productService = require('../services/product-services');
const {sendMessage} = require('../services/rabbitmqService');

const getProductsByFilter = async (req, res) => {
  const { name, plu, page, limit } = req.query;
  try {
    const products = await productService.getProductsByFilter(name, plu, page, limit);
    res.status(200).json(products);
  } catch (err) {
    
    res.status(500).json({ error: `Internal Server Error` });
  }
};

const createProduct = async (req, res) => {
  const { plu, name } = req.body;
  try {
    const product = await productService.createProduct(plu, name);
        
    res.status(201).json(product);

  } catch (err) {
    
    res.status(500).json({ error: `Internal Server Error` });
  }
};

module.exports = {
  getProductsByFilter,
  createProduct,  
};
