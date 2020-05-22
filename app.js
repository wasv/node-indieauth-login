import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import reactViews from 'express-react-views';

import loginRouter from './routes/login.js';
import userRouter from './routes/users.js';

var app = express();

app.use(logger('dev'));

app.set('views', path.resolve() + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine({beautify: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'dist')));

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

export default app;
