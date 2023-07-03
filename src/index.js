import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import {authRouter} from './routes/authRouter.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js';
import {userRouter} from './routes/userRouter.js';
import './models/User.js';
import './models/Token.js';
import {sequelize} from './utils/db.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: false,
    }),
);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    console.log(__dirname, res);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(express.json());

app.use(authRouter);
app.use('/users', userRouter);
app.use(errorMiddleware);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`started on port: ${PORT}`)
});
