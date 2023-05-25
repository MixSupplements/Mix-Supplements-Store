const mongoose = require('mongoose');

const app = require('express')();

require('dotenv').config()

/*********** Run all DB schemas ***********/


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