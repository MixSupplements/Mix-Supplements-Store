const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Product = mongoose.model("Product");

module.exports.index = (req, res, next) => {
    Order.find()
        .select("-__v")
        .then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(error)

        })
}

/**
 * place a new order with unique order number and initial status 
 * should check authorization , product availability and data consistency
 */
module.exports.create = async (req, res, next) => {
    const { customerId, products, shippingAddress, totalPrice } = req.body;

    /** 
     * To do ?
     * receive only the products ids and get other data from  the DB
     * preserve data consistency ??
     * ------------------------------------------------------------------
     * To Refactor:
     * All products updates must be one atomic operation (transaction ??)
     */
    try
    {
        // Only the customer is allowed to place orders for themselves
        if (req.decodedToken.id !== customerId)
        {
            const error = new Error('Unauthorized');
            error.status = 403;
            throw error;
        }
        // Check for totalPrice consistency with the ordered products
        const productsPrice = products.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0);
        if (totalPrice !== productsPrice)
        {
            const error = new Error('Order data is not valid');
            error.status = 422;
            throw error;
        }

        // Generate a unique order number
        const timestamp = new Date().getTime().toString();
        const orderNumber = `${timestamp.slice(0, 6)}-${timestamp.slice(6)}-${Math.floor(Math.random() * 1000)}`;

        const orderObject = new Order({
            orderNumber,
            status: 'Pending',
            totalPrice,
            shippingAddress,
            customerId,
            products,
        });

        // Check order availability
        const productsAvailability = await Promise.all(
            orderObject.products.map(async (orderedProduct) => {
                try
                {
                    const productInStore = await Product.findOne({
                        _id: orderedProduct.id,
                        deleted: false,
                    });
                    if (!productInStore || productInStore.quantity < orderedProduct.quantity)
                    {
                        const error = new Error('Order exceeds the available quantities');
                        error.status = 422;
                        throw error;
                    }
                    productInStore.quantity -= orderedProduct.quantity;
                    await productInStore.save();
                    return true;
                } catch (error)
                {
                    return false;
                }
            })
        );
        if (productsAvailability.includes(false))
        {
            const error = new Error('Some products are not available');
            error.status = 422;
            throw error;
        }

        await orderObject.save();
        res.status(201).json({ message: 'Order placed' });
    } catch (error)
    {
        next(error);
    }
}

module.exports.getOrder = (req, res, next) => {
    Order.findOne({ orderNumber: req.params.orderNumber })
        .select("-__v")
        .then((foundedOrder) => {
            console.log(foundedOrder);
            if (foundedOrder === null)
            {
                let error = new Error("Order not found");
                error.status = 404;
                throw error;
            }
            else
            {
                res.status(200).json(foundedOrder);
            }
        }).catch((error) => next(error))
}

module.exports.updateStatus = async (req, res, next) => {
    let status = req.body.status;
    try
    {
        const order = await Order.findOne({ _id: req.params.id, status: { $ne: "Cancelled" } });
        if (order === null)
        {
            const error = new Error('Order not found');
            error.status = 404;
            throw error;
        }

        // status management
        const validStatusTransitions = {
            Cancelled: ['Pending', 'Confirmed', 'Out for delivery'],
            Confirmed: ['Pending'],
            'Out for delivery': ['Confirmed'],
            Delivered: ['Out for delivery'],
            Completed: ['Delivered'],
        };

        if (!validStatusTransitions[status])
        {
            const error = new Error('Invalid status');
            error.status = 422;
            throw error;
        }

        const allowedTransitions = validStatusTransitions[status];
        if (!allowedTransitions.includes(order.status))
        {
            const error = new Error('Invalid status transition');
            error.status = 422;
            throw error;
        }

        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order status updated successfully' });

    } catch (error) { next(error) }
}
