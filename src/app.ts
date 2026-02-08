import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleare';
import dns from 'node:dns';
import apiRouter from './config/router.config';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json())

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
