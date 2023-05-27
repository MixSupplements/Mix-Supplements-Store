/************* Configrations *************/
const app = require("./config").app;

const express = require('express');
const morgan = require('morgan');

const brandRouter = require('./routes/brandRouter');
const NotFoundMiddleware = require('./middlewares/NotFoundMiddleware');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');


app.use(morgan('dev'));

app.use(express.json());


/***************** Routes ***************/

app.use(brandRouter);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
