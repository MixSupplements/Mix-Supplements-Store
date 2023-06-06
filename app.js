/************* Configrations *************/
const app = require("./config").app;

const express = require("express");
const morgan = require("morgan");

const loginRouter = require("./routes/loginRoute");
const adminLoginRouter = require("./routes/adminLoginRoute");
const logoutRouter = require("./routes/logoutRoute");
const registerRouter = require("./routes/registerRoute");
const categoryRouter = require("./routes/categoresRouter");
const shippingFeesRouter = require("./routes/shippingFeesRouter");
const orderRouter = require("./Routes/orderRoute");
const customerRouter = require("./routes/customerRoutes");
const productRouter = require("./routes/productRoute");
const brandRouter = require("./routes/brandRouter");
const cartRouter = require("./routes/cartRouter");
const adminRouter = require("./routes/adminRouter");
const wishlistRouter = require("./routes/wishlistRouter");

const authenticationMW = require("./middlewares/authenticationMW");
const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

// morgan
app.use(morgan("dev"));

// settings
app.use(express.json(), express.urlencoded({ extended: true }));

// register route
app.use(registerRouter);

// login routes
app.use(loginRouter);
app.use(adminLoginRouter);

// authentication
app.use(authenticationMW);

/***************** Routes ***************/
app.use(categoryRouter);
app.use(shippingFeesRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(brandRouter);
app.use(adminRouter);
app.use(wishlistRouter);

// log out route
app.use(logoutRouter);

//error middlewares
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);
