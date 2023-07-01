const mongoose = require("mongoose");
const shippingDestination = mongoose.model("ShippingDestination");
const Order = mongoose.model("Order");
const Product = mongoose.model("Product");

module.exports.index = (req, res, next) => {

    const status = req.params.status;

    const validStatus = ['Pending', 'Confirmed', 'Cancelled', 'Out for delivery', 'Delivered', 'Completed'];
    if (status && !validStatus.includes(status))
        throw Object.assign(new Error('Invalid Status'), { status: 422 });

    const condition = status ? { status: status } : {};
    Order.find(condition,
        'orderNumber totalPrice status updatedAt customerId')
        .populate({
            path: 'customerId',
            select: 'firstName lastName'
        })
        .select("-__v")
        .lean()
        .then((orders) => {
            orders = orders.map(order => {
                return {
                    orderNumber: order.orderNumber,
                    totalPrice: order.totalPrice,
                    status: order.status,
                    updatedAt: order.updatedAt,
                    customerName: `${order.customerId.firstName} ${order.customerId.lastName}`
                }
            });
            res.status(200).json(orders);
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

module.exports.getOrder = async (req, res, next) => {


    try
    {
        let foundOrder = await Order.findOne({ orderNumber: req.params.orderNumber })
            .populate([{
                path: 'customerId',
                select: 'firstName lastName email phoneNumbers'
            }, {
                path: 'products._id',
                select: 'images name price'
            }])
            .select("-__v")
            .lean()


        if (foundOrder === null)
        {
            let error = new Error("Order not found");
            error.status = 404;
            throw error;
        }
        else
        {
            const { customerId, products, ...rest } = foundOrder;
            const shippingInfo = await shippingDestination.findOne({ governorate: foundOrder.shippingAddress.governorate })

            foundOrder = {
                ...rest,
                customer: {
                    _id: customerId._id,
                    email: customerId.email,
                    name: customerId.firstName + ' ' + customerId.lastName,
                    phoneNumbers: customerId.phoneNumbers
                },
                products: products.map(({ _id, quantity }) => ({
                    _id: _id._id,
                    name: _id.name,
                    price: _id.price,
                    image: _id.images[0],
                    quantity
                })),
                shipping: {
                    fees: shippingInfo.fees,
                    days: shippingInfo.shippingDays
                }
            }
        }
        res.status(200).json(foundOrder);
    } catch (error) { next(error); }
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
