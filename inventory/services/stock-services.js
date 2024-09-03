const pool = require('../config/db');

const getStocksByFilter = async (plu,
    shop_id,
    quantity_on_shelf_min,
    quantity_on_shelf_max,
    quantity_in_order_min,
    quantity_in_order_max) => {

        let query = `
        SELECT stock.*, products.plu, products.product_name
        FROM stock
        JOIN products ON stock.product_id = products.id        
        WHERE 1=1
      `;
      const params = [];
  
      // Add filters to the query
      if (plu) {
        params.push(plu);
        query += ` AND products.plu = $${params.length}`;
      }
  
      if (shop_id) {
        params.push(shop_id);
        query += ` AND stock.shop_id = $${params.length}`;
      }
  
      if (quantity_on_shelf_min) {
        params.push(quantity_on_shelf_min);
        query += ` AND stock.quantity_on_shelf >= $${params.length}`;
      }
  
      if (quantity_on_shelf_max) {
        params.push(quantity_on_shelf_max);
        query += ` AND stock.quantity_on_shelf <= $${params.length}`;
      }
  
      if (quantity_in_order_min) {
        params.push(quantity_in_order_min);
        query += ` AND stock.quantity_in_order >= $${params.length}`;
      }
  
      if (quantity_in_order_max) {
        params.push(quantity_in_order_max);
        query += ` AND stock.quantity_in_order <= $${params.length}`;
      }
  
      const result = await pool.query(query, params);   
    return result.rows;
  };
  
  const createStock = async (product_id, shop_id, quantity_on_shelf, quantity_in_order) => {
   
    let query = `
        INSERT INTO stock (product_id, shop_id
      `;
       
    const params = [product_id, shop_id];
    
    let queryEnd = `) VALUES ($1, $2`;
  
      // Add filters to the query
      if (quantity_in_order) {
        params.push(quantity_in_order);
        query += ` ,quantity_in_order`;
        queryEnd += `, $${params.length}`
      }
  
      if (quantity_on_shelf) {
        params.push(quantity_on_shelf);
        query += ` ,quantity_on_shelf`;
        queryEnd += `, $${params.length}`
      }

      query += queryEnd + `) RETURNING *`;

    const result = await pool.query(
      query, params
    );    
    return result.rows[0];
  };
  
  const IncreaseShelf = async (id, change) => {
    const result = await pool.query(
        'UPDATE stock SET quantity_on_shelf = quantity_on_shelf + $1 WHERE id = $2 RETURNING *',
        [change, id]
    );
    return result.rows[0];
  };
  
  const DecreaseShelf = async (id, change) => {
    
    const result = await pool.query(
        'UPDATE stock SET quantity_on_shelf = quantity_on_shelf - $1 WHERE id = $2 RETURNING *',
        [change, id]
    );
    return result.rows[0];
  };

  const IncreaseOrder = async (id, change) => {
    const result = await pool.query(
        'UPDATE stock SET quantity_in_order = quantity_in_order + $1 WHERE id = $2 RETURNING *',
        [change, id]
    );
    return result.rows[0];
  };
  
  const DecreaseOrder = async (id, change) => {
    const result = await pool.query(
        'UPDATE stock SET quantity_in_order = quantity_in_order - $1 WHERE id = $2 RETURNING *',
        [change, id]
    );
    return result.rows[0];
  };

  const getQuantityOnShelf = async (id) => {
    
    const result = await pool.query(
        'SELECT quantity_on_shelf FROM stock WHERE id = $1',
        [id]
    );
    return result.rows[0];
  };

  const getQuantityInOrder = async (id) => {
    
    const result = await pool.query(
        'SELECT quantity_in_order FROM stock WHERE id = $1',
        [id]
    );
    return result.rows[0];
  };


  module.exports = {
    getStocksByFilter,
  createStock,  
  IncreaseShelf,
  IncreaseOrder,
  DecreaseShelf,
  DecreaseOrder,
  getQuantityOnShelf,
  getQuantityInOrder
  };
  