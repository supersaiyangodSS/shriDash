import express, { urlencoded, Request, Response } from 'express';
import { errorHandler } from '@/middleware/errorHandler.middleware';
import dns from 'node:dns';
import apiRouter from '@/router/router';
import { apiLimiter } from '@/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(hpp());
app.use('/api', apiLimiter, apiRouter);

app.get('/', apiLimiter, (req: Request, res: Response) => {
    res.json({ message: 'Homepage' });
})

app.use(errorHandler);

export default app;
