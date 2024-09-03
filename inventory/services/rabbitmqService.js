const amqp = require('amqplib');
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });

let channel;
let connection;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('stock_actions', { durable: true });  
}

async function closeRabbitMQ() {
  try {
    if (channel) {
      await channel.close();
      console.log('RabbitMQ channel closed');
    }

    if (connection) {
      await connection.close();
      console.log('RabbitMQ connection closed');
    }
  } catch (err) {
    console.error('Error closing RabbitMQ connection or channel:', err);
  } finally {
    channel = null;
    connection = null;
  }
}

async function sendMessage(queue, message) {
  if (!channel) {
    await connectRabbitMQ();
  }
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });  
}

module.exports = {closeRabbitMQ, connectRabbitMQ, sendMessage };