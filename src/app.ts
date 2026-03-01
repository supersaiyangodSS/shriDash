import express, { urlencoded } from 'express';
import { errorHandler } from '@/middleware/errorHandler.middleware';
import dns from 'node:dns';
import apiRouter from '@/router/router';
import { apiLimiter } from '@/config';
import cookieParser from 'cookie-parser';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json())
app.use('/api', apiLimiter, apiRouter);

app.use(errorHandler);

export default app;
