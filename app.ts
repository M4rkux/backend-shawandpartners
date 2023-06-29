import express, { Express } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(cors());

app.use('/api', usersRouter);

export default app;