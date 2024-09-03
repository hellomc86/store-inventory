import { DataSource } from 'typeorm';
import { StockHistory } from './entities/stockHistory';
import dotenv from 'dotenv';
import { Product } from './entities/product';
import { Shop } from './entities/shops';
import { Stock } from './entities/stock';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });


export const AppDataSource = new DataSource({
  type: 'postgres',  
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  synchronize: Boolean(process.env.POSTGRES_DATABASE_SYNC), 
  entities: [StockHistory, Stock, Shop, Product], 
});

/* AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
 */