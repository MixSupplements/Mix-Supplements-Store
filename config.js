const mongoose = require('mongoose');

const app = require('express')();

require('dotenv').config()

/*********** Run all DB schemas ***********/
require('./models/adminModel');
require('./models/brandModel');
require('./models/categoresModels');
require('./models/customerModel');
require('./models/ordersModel');
require('./models/productModel');
require('./models/reviewModel');
require('./models/shippingFeesModels');

mongoose.connect(process.env.DBURI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
        // open a connection
        app.listen(process.env.PORT || process.env.port, () => {
            console.log(`server is listening`);
        })
    })
    .catch(error => console.log(`DB connection problem: ${error}`))

module.exports.app = app;