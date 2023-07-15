const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

/**
 * Register a new customers 
 */
exports.register = (req, res, next) => {

    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const customer = new Customer({

        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumbers: phoneNumber ? [phoneNumber] : [],
    });
    customer
        .save()
        .then(() => {
            res.status(201).json({ message: "Customer Registered" });
        })
        .catch((error) => next(error));
};

/**
 * Get the user with id
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
        .populate({
            path: "products._id",
            select: "name price"
        })
        .lean()
        .then(orders => {
            orders = orders.map(order => {
                let { products, ...rest } = order;
                return {
                    ...rest,
                    products: products.map(({ _id, quantity }) => ({
                        _id: _id._id,
                        name: _id.name,
                        price: _id.price,
                        quantity
                    }))
                }
            })
            res.status(200).json(orders)
        })
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

    Customer.updateOne({ _id: req.params.id, deleted: false }, req.body)
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