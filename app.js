/************* Configrations *************/
const app = require("./config").app;

const express = require('express');
const morgan = require('morgan');

const NotFoundMiddleware = require('./middlewares/NotFoundMiddleware');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

const productRouter = require('./routes/productRoute');


app.use(morgan('dev'));

app.use(express.json());


/***************** Routes ***************/
app.use(productRouter)


app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
