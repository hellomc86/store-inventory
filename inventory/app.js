const express = require('express');
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const productRoutes = require('./routes/product-routes');
const stockRoutes = require('./routes/stock-routes');
const { closeRabbitMQ } = require('./services/rabbitmqService');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Use product routes
app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Inventory service running on port ${port}`);
});


// Graceful shutdown function
async function shutdown() {
  console.log('Shutting down gracefully...');
  await closeRabbitMQ();
  process.exit(0);
}

// Listen for shutdown signals to initiate graceful shutdown
process.on('SIGINT', shutdown);  // Triggered by Ctrl+C
process.on('SIGTERM', shutdown); // Triggered by system shutdown or kill command