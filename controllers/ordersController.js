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
        }).catch((error) => {
            error.status = 422;
            next(error);
        })
}

module.exports.update = (req, res, next) => {
    const { id, status } = req.body;
    Order.updateOne({ _id: id }, { status: status })
        .then((data) => {
            res.status(200).json({ message: "Updated Order", data });
        }).catch((error) => {
            error.status = 422;
            next(error)
        })
}

module.exports.destroy = (req, res, next) => {
    Order.findOneAndUpdate(
        { _id: req.params.id, deleted: false },
        { $set: { deleted: true } },
        { new: true })
        .then((deleted) => {
            if (deleted === null) throw new Error("Order Not Exist")
            res.status(200).json({ message: "Deleted Order", deleted })
        }).catch((err) => {
            err.status = 422;
            next(err)
        })
}