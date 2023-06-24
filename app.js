/************* Configurations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require('./routes/authRouter');

const categoryRouter = require("./routes/categoryRouter");
const shippingDestinationRouter = require("./routes/shippingDestinationRouter");
const orderRouter = require("./Routes/orderRoute");
const customerRouter = require('./routes/customerRoutes');
const productRouter = require('./routes/productRoute');
const brandRouter = require('./routes/brandRouter');
const cartRouter = require('./routes/cartRouter');
const adminRouter = require('./routes/adminRouter');
const wishlistRouter = require('./routes/wishlistRouter');
const reviewRouter = require('./routes/reviewRouter');

const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

// morgan
app.use(morgan("dev"));

// settings
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

/***************** Routes ***************/
app.use(authRouter);

app.use(categoryRouter);
app.use(shippingDestinationRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(brandRouter);
app.use(adminRouter);
app.use(wishlistRouter);
app.use(reviewRouter);

//error middlewares
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
