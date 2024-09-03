exports.shorthands = undefined;

/* eslint-disable camelcase */
exports.up = (pgm) => {
    // Create 'shops' table if not exists
    pgm.sql(`
      CREATE TABLE IF NOT EXISTS shops (
        id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        shop_address VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  
    // Create 'products' table if not exists
    pgm.sql(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        plu VARCHAR(255) NOT NULL UNIQUE,
        product_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  
    // Create 'stock' table if not exists
    pgm.sql(`
      CREATE TABLE IF NOT EXISTS stock (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL REFERENCES products ON DELETE CASCADE,
        shop_id INTEGER NOT NULL REFERENCES shops ON DELETE CASCADE,
        quantity_on_shelf INTEGER NOT NULL DEFAULT 0,
        quantity_in_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  
    // Add unique constraint to avoid duplicate product-stock entries for the same shop
    pgm.addConstraint('stock', 'unique_product_shop', {
      unique: ['product_id', 'shop_id']
    });
  };
  
  exports.down = (pgm) => {
    // Drop 'stock' table if exists
    pgm.sql('DROP TABLE IF EXISTS stock;');
  
    // Drop 'products' table if exists
    pgm.sql('DROP TABLE IF EXISTS products;');
  
    // Drop 'shops' table if exists
    pgm.sql('DROP TABLE IF EXISTS shops;');
  };
  