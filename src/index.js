import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import {authRouter} from './routes/authRouter.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js';
import {userRouter} from './routes/userRouter.js';
import './models/User.js';
import './models/Token.js';
import {sequelize} from './utils/db.js';

const app = express();

const PORT = process.env.PORT || 5002;

app.use(
    cors({
        origin: ['https://usee-svit.vercel.app', 'http://localhost:3000'],
        credentials: false,
    }),
);

app.use(express.static('client/build'));

app.use(express.json());

app.use(authRouter);
app.use('/users', userRouter);
app.use(errorMiddleware);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`started on port: ${PORT}`);
});
