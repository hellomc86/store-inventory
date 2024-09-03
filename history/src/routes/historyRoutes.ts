import express from 'express';
import { getHistory } from '../controllers/historyController';

const router = express.Router();

router.get('/history', getHistory);

export default router;
