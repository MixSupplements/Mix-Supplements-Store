const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Product = mongoose.model('Product');

exports.index = (req, res, next) => {
    Customer.findById(req.decodedToken.id)
        .select('wishlist')
        .populate('wishlist')
        .then(data => {
            res.status(200).json(data.wishlist);
        })
        .catch(error => next(error))
}

exports.add = async (req, res, next) => {
    const productId = req.params.id;
    try
    {
        const product = await Product.findById(productId);
        let customer = await Customer.findById(req.decodedToken.id).select('wishlist');
        let wishlist = customer.wishlist || [];

        if (wishlist.includes(productId))
            throw Object.assign(new Error('Product already exists in wishlist'), { status: 422 });

        if (product)
        {
            wishlist.push(productId);
            await customer.save();
            res.status(200).json({ message: "Product added to wishlist" });
        }
        else
        {
            throw Object.assign(new Error('Product not found'), { status: 422 });
        }
    } catch (error) { next(error) }
}

exports.remove = (req, res, next) => {
    Customer.updateOne({ _id: req.decodedToken.id }, { $pull: { wishlist: req.params.id } })
        .then((data) => {
            res.status(200).json({ message: "Product removed to wishlist", data });
        })
        .catch(error => next(error))
}

exports.reset = (req, res, next) => {
    Customer.updateOne({ _id: req.decodedToken.id }, { wishlist: [] })
        .then(data => {
            res.status(200).json({ message: "Wishlist cleared" });
        })
        .catch(error => next(error))
}