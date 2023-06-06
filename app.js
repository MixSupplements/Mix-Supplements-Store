/************* Configrations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");

// Routers Layer
const categoryRouter = require("./routes/categoresRouter");
const shippingFeesRouter = require("./routes/shippingFeesRouter");
const orderRouter = require("./Routes/orderRoute");
const customerRouter = require('./routes/customerRoutes');
const productRouter = require('./routes/productRoute');
const brandRouter = require('./routes/brandRouter');
const cartRouter = require('./routes/cartRouter');
const adminRouter = require('./routes/adminRouter');
const wishlistRouter = require('./routes/wishlistRouter');
const uploadRouter = require('./routes/uploadRouter');

const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");


app.use(morgan('dev'));
app.use(express.json());

/***************** Routes ***************/
app.use(categoryRouter);
app.use(shippingFeesRouter);
app.use(orderRouter)
app.use(customerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(brandRouter);
app.use(adminRouter);
app.use(wishlistRouter);
app.use(uploadRouter);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
