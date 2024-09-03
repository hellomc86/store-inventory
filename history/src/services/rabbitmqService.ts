import amqp from 'amqplib';
import { AppDataSource } from '../data-source';
import { StockHistory } from '../entities/stockHistory';
import dotenv from 'dotenv';
import { Stock } from '../entities/stock';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

const queue = 'stock_actions';

async function startRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const content = msg.content.toString();
      const actionData = JSON.parse(content);
      
      const newHistory = new StockHistory();
      newHistory.stock = {id: actionData.stock_id} as Stock;
      
      newHistory.action = actionData.action;
      newHistory.quantity = actionData.quantity;
      newHistory.quantity_on_shelf = actionData.quantity_on_shelf;
      newHistory.quantity_in_order = actionData.quantity_in_order;

      const historyRepo = AppDataSource.getRepository(StockHistory);
      //const newHistory = historyRepo.create(actionData);
      
      await historyRepo.save(newHistory);

      channel.ack(msg);
    }
  });
}

export default startRabbitMQ;
