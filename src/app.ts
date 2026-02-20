import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware';
import dns from 'node:dns';
import apiRouter from '@/router/router.config';
import { apiLimiter } from '@/config';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json())

app.use('/api', apiLimiter, apiRouter);

app.use(errorHandler);

export default app;
