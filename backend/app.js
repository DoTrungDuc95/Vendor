import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import errorHandler from './middleware/errors.js';
import corsOptions from './config/corsConfig.js';

//routes
import authRouter from './routes/authRouter.js';

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res, next) => {
  res.cookie('test', 'refreshToken', {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
  res.send('Hello');
  next();
});

if (process.env.NNODE_ENV !== 'PRODUCTION') {
  dotenv.config();
}

app.use('/api', authRouter);

app.use(errorHandler);

export default app;
