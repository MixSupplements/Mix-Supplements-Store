/************* Configrations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Routers Layer
const categoryRouter = require("./routes/categoresRouter");
const shippingFeesRouter = require("./routes/shippingFeesRouter");
const orderRouter=require("./Routes/orderRoute");

const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

app.use(morgan("dev"));
app.use(express.json());

/***************** Routes ***************/

app.use(categoryRouter);
app.use(shippingFeesRouter);
app.use(orderRouter)



app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
