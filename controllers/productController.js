const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const Product = mongoose.model('Product');

module.exports.index = async (request, response, next) => {
    try
    {
        const products = await Product.find({ deleted: false }).populate([{
            path: "category",
            select: "name"
        }, {
            path: "brand",
            select: "name"
        }]);
        response.status(200).json(products);
    } catch (error)
    {
        next(error);
    }
}

module.exports.getOne = async (request, response, next) => {
    try
    {
        const product = await Product.findOne({ _id: request.params.id, deleted: false }).select("-__v");
        if (product)
            response.status(200).json(product);
        else
            throw Object.assign(new Error("Product not found"), { status: 404 });
    } catch (error)
    {
        next(error);
    }
}

module.exports.search = async (request, response, next) => {

    let searchText = request.params.searchText;
    try
    {
        const products = await Product.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { description: { $regex: searchText, $options: 'i' } },
            ],
            deleted: false,
        });
        response.status(200).json(products);
    } catch (error)
    {
        next(error);
    }
}

module.exports.create = async (request, response, next) => {
    const productObject = new Product(request.body);
    try
    {
        const newProduct = await productObject.save();
        response.status(201).json({ message: "New Product Added", newProduct })
    } catch (error)
    {
        next(error);
    }
}

module.exports.addImage = async (request, response, next) => {
    try
    {
        const product = await Product.findOneAndUpdate({ _id: request.params.id, deleted: false }, {
            $push: {
                images: request.body.image
            }
        }, { new: true })
        if (product)
            response.status(201).json({ message: "Image added successfully", product });
        else
            throw Object.assign(new Error("Product not found"), { status: 404 });
    } catch (error)
    {
        next(error);
    }
}

module.exports.removeImage = async (request, response, next) => {
    try
    {
        const product = await Product.findOneAndUpdate({ _id: request.params.id }, {
            $pull: {
                images: { publicId: request.params.image }
            }
        }, { new: true })
        if (product)
        {
            const cloudResponse = await cloudinary.uploader.destroy(request.params.image, { invalidate: true });
            if (cloudResponse.result == 'ok')
                response.status(200).json({ message: "Image deleted successfully", product });
            else
                throw Object.assign(new Error('Image not found'), { status: 404 });
        }
        else
            throw Object.assign(new Error("Product not found"), { status: 404 });
    } catch (error)
    {
        next(error);
    }
}

module.exports.update = async (request, response, next) => {
    try
    {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: request.params.id, deleted: false },
            request.body,
            { new: true }
        );
        if (updatedProduct)
            response.status(200).json({ message: "Product updated", updatedProduct });
        else
            throw Object.assign(new Error("Product not found"), { status: 404 });
    } catch (error)
    {
        next(error);
    }
}

module.exports.destroy = async (request, response, next) => {
    try
    {
        const deletedProduct = await Product.findOneAndUpdate(
            { _id: request.params.id, deleted: false },
            {
                $set: { deleted: true, quantity: 0 },
            }
            , { new: true })
        if (deletedProduct)
            response.status(200).json({ message: "Product deleted" })
        else
            throw Object.assign(new Error("Product not found"), { status: 404 });
    } catch (error)
    {
        next(error);
    }
}