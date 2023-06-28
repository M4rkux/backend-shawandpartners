import express, { Express } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes';

dotenv.config();

const app: Express = express();

app.use('/api', usersRouter);

export default app;