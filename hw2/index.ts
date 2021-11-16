import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db';
import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import './models/associations';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('tiny'));

app.use('/api', userRouter);
app.use('/api', groupRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

