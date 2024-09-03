import { SelectQueryBuilder } from 'typeorm';
import { StockHistory } from '../entities/stockHistory';

import { AppDataSource } from '../data-source';


interface HistoryFilterParams {
  shopId?: number;
  plu?: string;
  startDate?: string;
  endDate?: string;
  action?: string;
  page?: number;
  limit?: number;
}

export const getHistoryService = async (params: HistoryFilterParams) => {
  const { shopId, plu, startDate, endDate, action, page = 1, limit = 10 } = params;
  
  const stockHistoryRepository = AppDataSource.getRepository(StockHistory);

  // Start building the query
  const query: SelectQueryBuilder<StockHistory> = stockHistoryRepository
    .createQueryBuilder('stock_history')
    .leftJoin('stock_history.stock', 'stock')    
    .addSelect(['stock.quantity_on_shelf', 'stock.quantity_in_order'])
    .leftJoin('stock.shop', 'shops')
    .addSelect(['shops.shop_name', 'shops.shop_address'])
    .leftJoin('stock.product', 'products')
    .addSelect(['products.product_name', 'products.plu'])
    

  // Apply filters based on parameters
  if (shopId) {
    query.andWhere('stock_history.shop_id = :shopId', { shopId });
  }

  if (plu) {
    query.andWhere('products.plu = :plu', { plu });
  }

  if (startDate) {
    query.andWhere('stock_history.createdAt >= :startDate', { startDate });
  }

  if (endDate) {
    query.andWhere('stock_history.createdAt <= :endDate', { endDate });
  }

  if (action) {
    query.andWhere('stock_history.action = :action', { action });
  }

  // Implement pagination
  query.skip((page - 1) * limit).take(limit);

  // Execute query and get results
  const [result, total] = await query.getManyAndCount();

  return {
    data: result,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
