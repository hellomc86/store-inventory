/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.sql(`
      INSERT INTO shops (shop_name, shop_address) VALUES
      ('Shop A', '123 Main St, Springfield'),
      ('Shop B', '456 Oak St, Shelbyville'),
      ('Shop C', '789 Elm St, Capital City')
    `);
    pgm.sql(`
      INSERT INTO products (plu, product_name) VALUES
      ('SHIRT125', 'Blue shirt for men'),
      ('SHIRT126', 'Green shirt for men'),
      ('SHIRT127', 'Black shirt for men')
    `);
  };
  
  exports.down = (pgm) => {
    pgm.sql(`
      DELETE FROM shops WHERE shop_name IN ('Shop A', 'Shop B', 'Shop C');
    `);
    pgm.sql(`
      DELETE FROM products WHERE plu IN ('SHIRT125', 'SHIRT126', 'SHIRT127');
    `);
  };
