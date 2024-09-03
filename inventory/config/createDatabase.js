const { Client } = require('pg');
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });

const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE_DEFAULT,
});

// Extract database name from the DATABASE_URL
const dbName = process.env.POSTGRES_DATABASE;

// Connect to PostgreSQL without specifying a database
async function createDatabase() {
  try {
    
    await client.connect();
    

    // Check if the database already exists
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount === 0) {
      // Create the database if it does not exist
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
