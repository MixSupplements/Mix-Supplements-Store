/************* Configurations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");

const authRouter = require('./routes/authRouter');

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

// morgan
app.use(morgan("dev"));

// settings
app.use(express.json(), express.urlencoded({ extended: true }));

/***************** Routes ***************/
app.use(authRouter);

app.use(categoryRouter);
app.use(shippingFeesRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(brandRouter);
app.use(adminRouter);
app.use(wishlistRouter);
app.use(uploadRouter);

//error middlewares
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
