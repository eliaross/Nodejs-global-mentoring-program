import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('tiny'));

app.use('/api', userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
