import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import historyRoutes from './routes/historyRoutes';
import startRabbitMQ from './services/rabbitmqService';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', historyRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully.');
    startRabbitMQ();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
