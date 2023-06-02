const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

/***********************************************************************
 * dummy middleware to add customers to DB
 */
exports.add = (request, response, next) => {

    let data = request.body;
    let customer = new Customer(data);
    customer.save()
        .then((data) => {
            response.status(201).json(data);
        }).catch(error => next(error));
}

/************************************************************************
 * Get the user with id
 * 
 * ** needs to be refactored to get the current user without passing the id
 */
exports.getCurrent = (request, response, next) => {
    Customer.findById(request.params.id)
        .then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
}

/************************************************************************
 * Get all orders for certain user
 */
exports.getOrders = (request, response, next) => {
    Order.find({ customerId: request.params.id })
        .then(data => response.status(200).json(data))
        .catch(error => next(error));
}

/************************************************************************
 * Update some of customer data
 */
exports.update = (request, response, next) => {
    let { id, ...data } = request.body;
    Customer.updateOne({ _id: id }, { $set: data })
        .then(data => response.status(200).json(data))
        .catch(error => next(error));
}

/************************************************************************
 * Delete customer (soft deletion)
 */
exports.destroy = (request, response, next) => {
    Customer.updateOne({ _id: request.body.id, deleted: false },
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
                response.status(200).json("User Deleted");
            }
        })
        .catch(error => next(error));
}