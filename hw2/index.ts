import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db';
import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import './models/associations';
import { apiLogger } from './routers/middlewares/loggers/apiLogger';
import logger from './routers/middlewares/loggers/logger';
import handleError from './routers/middlewares/loggers/handleError';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(json());
app.use(apiLogger);

app.use('/api', userRouter);
app.use('/api', groupRouter);

app.use(handleError);

process.on('unhandledRejection', (err) => {
  logger.error(err);

  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error(err);

  process.exit(1);
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
