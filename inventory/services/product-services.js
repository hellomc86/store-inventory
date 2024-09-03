const pool = require('../config/db');

const getProductsByFilter = async (name, plu) => {
  const result = await pool.query(
    `SELECT * FROM products 
    WHERE ($1::text IS NULL OR product_name = $1)
    AND ($2::text IS NULL OR plu = $2)
    ORDER BY created_at DESC    
  `, [name, plu]);
  return result.rows;
};

const createProduct = async (plu, name) => {
  const result = await pool.query(
    'INSERT INTO products (plu, product_name) VALUES ($1, $2) RETURNING *',
    [plu, name]
  );
  return result.rows[0];
};

module.exports = {
  getProductsByFilter,
  createProduct, 
};
