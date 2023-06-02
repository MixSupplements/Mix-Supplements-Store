const mongoose = require("mongoose");

const Product = mongoose.model('Product');


module.exports.getAllProducts = async (request, response, next) => {
    try {
        const products = await Product.find({ deleted: false });
        response.status(200).json({ message: "sucessfully get products", products })
    } catch (error) {
        next(error);
    }
}

module.exports.getProductById = async (request, response, next) => {
    try {
        const productById = await Product.findOne({ _id: request.params.id, deleted: false });
        if (productById)
            response.status(200).json({ message: "sucessfully get product by id", productById })
        else
            throw new Error("Product doesn't exist");
    } catch (error) {
        next(error);
    }
}

module.exports.addNewProduct = async (request, response, next) => {
    const productObject = new Product(request.body);
    try {
        const newProduct = await productObject.save();
        response.status(201).json({ message: "sucessfully add new product", newProduct })
    } catch (error) {
        next(error);
    }
}

module.exports.updateProduct = async (request, response, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (updatedProduct)
            response.status(200).json({ message: "sucessfully update product", updatedProduct });
        else
            throw new Error("Product doesn't exist");
    } catch (error) {
        next(error);
    }
}

module.exports.deleteProduct = async (request, response, next) => {
    try {
        const deletedProduct = await Product.findOneAndUpdate(
            { _id: request.params.id, deleted: false },
            {
                $set: { deleted: true, quantity: 0 },
            }
            , { new: true })
        if (deletedProduct)
            response.status(200).json({ message: "sucessfully delete product", deletedProduct })
        else
            throw new Error("Product doesn't exist");
    } catch (error) {
        next(error);
    }
}