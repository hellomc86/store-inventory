const stockService = require('../services/stock-services');
const {sendMessage} = require('../services/rabbitmqService');

const getStocksByFilter = async (req, res) => {
  const { plu,
    shop_id,
    quantity_on_shelf_min,
    quantity_on_shelf_max,
    quantity_in_order_min,
    quantity_in_order_max} = req.query;
  try {
    const stocks = await stockService.getStocksByFilter(plu,
        shop_id,
        quantity_on_shelf_min,
        quantity_on_shelf_max,
        quantity_in_order_min,
        quantity_in_order_max);
    res.status(200).json(stocks);
  } catch (err) {    
    console.log(err)
    res.status(500).json({ error: `Internal Server Error` });
  }
};

const createStock = async (req, res) => {
  const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body;
  try {
    const stock = await stockService.createStock(product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order);
        
    if(stock) sendMessage('stock_actions', { action: 'create_stock', stock_id: stock.id,
      quantity_on_shelf: stock.quantity_on_shelf,
      quantity_in_order: stock.quantity_in_order
     });

    res.status(201).json(stock);
  } catch (err) {

    if (err.code === '23503') {    
      // Handle foreign key violation error (example)
      res.status(422).json({ error: `Foreign key violation:, ${err.detail}` });
    
    } else {
      res.status(500).json({ error: `Internal Server Error` });
    }
  }
};

const IncreaseShelf = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    try {
        const stock = await stockService.IncreaseShelf(id, change);
        if (!stock ) {
        return res.status(404).json({ error: 'stock not found' });
      }

      sendMessage('stock_actions', { action: 'increase_shelf',  stock_id: stock.id,
        quantity_on_shelf: stock.quantity_on_shelf,
        quantity_in_order: stock.quantity_in_order, quantity: change  });
      res.status(200).json(stock);
    } catch (err) {
      
      res.status(500).json({ error: `Internal Server Error` });
    }
}

const DecreaseShelf = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    try {
      const result = await stockService.getQuantityOnShelf(id);
      
      if(!result) {
        return res.status(404).json({ error: 'stock not found' });
      }

      if(result.quantity_on_shelf < change) {
        return res.status(422).json({ error: `quantity_on_shelf cannot be below zero. Current quantity_on_shelf: ${result.quantity_on_shelf}` });
      }
        const stock = await stockService.DecreaseShelf(id, change);
       
        sendMessage('stock_actions', { action: 'decrease_shelf', stock_id: stock.id,
          quantity_on_shelf: stock.quantity_on_shelf,
          quantity_in_order: stock.quantity_in_order, quantity: change });
        res.status(200).json(stock);
    } catch (err) {
      
      res.status(500).json({ error: `Internal Server Error` });
    }
}

const IncreaseOrder = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    try {
        const stock = await stockService.IncreaseOrder(id, change);
        if (!stock ) {
          return res.status(404).json({ error: 'stock not found' });
        }
        sendMessage('stock_actions', { action: 'increase_order',  stock_id: stock.id,
          quantity_on_shelf: stock.quantity_on_shelf,
          quantity_in_order: stock.quantity_in_order, quantity: change  });
        res.status(200).json(stock);
    } catch (err) {
      
      res.status(500).json({ error: `Internal Server Error` });
    }
}

const DecreaseOrder = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    try {

      const result = await stockService.getQuantityInOrder(id);
      if(!result) {
        return res.status(404).json({ error: 'stock not found' });
      }

      if(result.quantity_in_order < change) {
        return res.status(422).json({ error: `quantity_in_order cannot be below zero. Current quantity_in_order: ${result.quantity_in_order}` });
      }

        const stock = await stockService.DecreaseOrder(id, change);
       
        sendMessage('stock_actions', { action: 'decrease_order',  stock_id: stock.id,
          quantity_on_shelf: stock.quantity_on_shelf,
          quantity_in_order: stock.quantity_in_order, quantity: change  });
        res.status(200).json(stock);
    } catch (err) {
      
      res.status(500).json({ error: `Internal Server Error` });
    }
}

module.exports = {
  getStocksByFilter,
  createStock,  
  IncreaseShelf,
  IncreaseOrder,
  DecreaseShelf,
  DecreaseOrder,
};
