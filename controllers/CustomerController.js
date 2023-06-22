const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

/**
 * Register a new customers 
 */
exports.register = (req, res, next) => {

    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const newCustomer = new Customer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumbers: [phoneNumber],
    });
    newCustomer
        .save()
        .then(() => {
            res.status(201).json({ message: "Customer Registered" });
        })
        .catch((error) => next(error));
};

/**
 * Get the user with id
 * 
 * ** needs to be refactored to get the current user without passing the id
 */
exports.getCurrent = (req, res, next) => {
    Customer.findById(req.decodedToken.id)
        .then(data => {
            res.status(200).json(data);
        }).catch(error => next(error));
}

/**
 * Get all orders for certain user
 */
exports.getOrders = (req, res, next) => {
    Order.find({ customerId: req.decodedToken.id })
        .select("-__v")
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
}

/**
 * Update some of customer data (only customer can update his data)_
 */
exports.update = (req, res, next) => {

    if (req.decodedToken.id !== req.params.id)
    {
        let error = new Error("Unauthorized");
        error.status = 403;
        next(error);
        return;
    }

    let updateData = { ...req.body };
    console.log(updateData);
    Customer.updateOne({ _id: req.params.id, deleted: false }, { $set: updateData })
        .then(data => {
            if (data.matchedCount == 0)
            {
                let error = new Error("User Not Found");
                error.status = 422;
                next(error);
            }
            else
            {
                res.status(200).json({ message: "User Updated", data });
            }
        })
        .catch(error => next(error));
}

/**
 * Delete customer (soft deletion)
 */
exports.destroy = (req, res, next) => {

    if (req.decodedToken.id !== req.params.id)
    {
        let error = new Error("Unauthorized");
        error.status = 403;
        next(error);
        return;
    }

    Customer.updateOne({ _id: req.params.id, deleted: false },
        { deleted: true, $unset: { email: 1 } })
        .then(data => {
            if (data.matchedCount == 0)
            {
                let error = new Error("User Not Found");
                error.status = 422;
                next(error);
            }
            else
            {
                res.status(200).json({ message: "User Deleted" });
            }
        })
        .catch(error => next(error));
}