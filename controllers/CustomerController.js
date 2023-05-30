const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

/***********************************************************************
 * dummy middleware to add customers to DB
 */
exports.add = (req, res, next) => {

    let data = req.body;
    let customer = new Customer(data);
    customer.save()
        .then((data) => {
            res.status(201).json(data);
        }).catch(error => next(error));
}

/************************************************************************
 * Get the user with id
 * 
 * ** needs to be refactored to get the current user without passing the id
 */
exports.getCurrent = (req, res, next) => {
    Customer.findById(req.params.id)
        .then(data => {
            res.status(200).json(data);
        }).catch(error => next(error));
}

/************************************************************************
 * Get all orders for certain user
 */
exports.getOrders = (req, res, next) => {
    Order.find({ customerId: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
}

/************************************************************************
 * Update some of customer data
 */
exports.update = (req, res, next) => {
    let { id, ...data } = req.body;
    Customer.updateOne({ _id: id }, { $set: data })
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
}

/************************************************************************
 * Delete customer (soft deletion)
 */
exports.destroy = (req, res, next) => {
    Customer.updateOne({ _id: req.body.id, deleted: false },
        { deleted: true, $unset: { email: 1 } })
        .then(data => {
            if (data.matchedCount == 0)
            {
                let error = new Error("User Not Found");
                error.status = 409;
                next(error);
            }
            else
            {
                res.status(200).json("User Deleted");
            }
        })
        .catch(error => next(error));
}