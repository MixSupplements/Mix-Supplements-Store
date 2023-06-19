const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Product = mongoose.model('Product');
const Review = mongoose.model('Review');

exports.add = async (req, res, next) => {
    try
    {
        /**
         * ToDo: 
         * customer should only add one review per product
         */
        let customer = await Customer.findById(req.decodedToken.id).select('_id firstName lastName');

        let review = new Review({
            customer: {
                _id: customer._id,
                name: customer.firstName + " " + customer.lastName
            },
            ...req.body
        });

        let product = await Product.findById(req.body.productId);
        product.reviews.push({ _id: review._id, score: review.score });
        product.rating = (
            product.reviews.reduce((acc, current) => acc + current.score, 0) / product.reviews.length
        ).toPrecision(2);

        await product.save();
        await review.save();
        res.status(201).json({ message: "Review Added successfully" });
    } catch (error)
    {
        next(error);
    }
}

exports.getByProduct = (req, res, next) => {
    Review.find({ productId: req.params.id })
        .then((reviews) => {
            res.status(200).json(reviews);
        })
        .catch((error) => next(error))
}