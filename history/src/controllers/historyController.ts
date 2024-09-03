import { Request, Response } from 'express';

import { getHistoryService } from '../services/historyService';

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { shop_id, plu, startDate, endDate, action, page = 1, limit = 10 } = req.query;

    const params = {shopId:shop_id ? +shop_id:undefined,
      plu: plu?String(plu):undefined,      
      startDate: startDate? String(startDate):undefined,
      endDate: endDate? String(endDate): undefined,
      action:action? String(action): undefined,
      page: +page,
      limit:+limit}

    const result = await getHistoryService(params);
   
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
