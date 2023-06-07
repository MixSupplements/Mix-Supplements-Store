/************* Configrations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Routers Layer
const categoryRouter = require("./routes/categoresRouter");
const shippingFeesRouter = require("./routes/shippingFeesRouter");
const productRouter = require("./routes/productRoute");

// Error Handler Layer
const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

app.use(morgan("dev"));
app.use(express.json());

/***************** Routes ***************/
app.use(categoryRouter);
app.use(shippingFeesRouter);
app.use(productRouter);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
