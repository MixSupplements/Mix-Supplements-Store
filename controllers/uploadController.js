const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const Product = mongoose.model('Product');
const Brand = mongoose.model('Brand');

module.exports.addProductImage = async (request, response, next) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: request.body.productId }, {
            $push: {
                images: request.body.image
            }
        }, { new: true })
        if (product)
            response.status(201).json({ message: "Image added successfully", product });
        else
            throw Object.assign(new Error("Product doesn't exist"), { status: 404 });
    } catch (error) {
        next(error);
    }
}

module.exports.removeProductImage = async (request, response, next) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: request.params.productId }, {
            $pull: {
                images: { publicId: request.params.imageId }
            }
        }, { new: true })
        if (product) {
            const cloudResponse = await cloudinary.uploader.destroy(request.params.imageId, { invalidate: true });
            if (cloudResponse.result == 'ok')
                response.status(200).json({ message: "Image deleted successfully", product });
            else
                throw Object.assign(new Error('Image not found'), { status: 404 });
        }
        else
            throw Object.assign(new Error("Product doesn't exist"), { status: 404 });
    } catch (error) {
        next(error);
    }
}

module.exports.addBrandImage = async (request, response, next) => {
    try {
        const brand = await Brand.findOneAndUpdate({ _id: request.body.brandId }, {
            $set: { logo: request.body.image }
        }, { new: true })
        if (brand)
            response.status(201).json({ message: "Image added successfully", brand });
        else
            throw Object.assign(new Error("Brand doesn't exist"), { status: 404 });
    } catch (error) {
        next(error);
    }
}

module.exports.removeBrandImage = async (request, response, next) => {
    try {
        const brand = await Brand.findOneAndUpdate({ _id: request.params.brandId }, {
            $set: { logo: null }
        }, { new: true })
        if (brand) {
            const cloudResponse = await cloudinary.uploader.destroy(request.params.imageId, { invalidate: true });
            if (cloudResponse.result == 'ok')
                response.status(200).json({ message: "Image deleted successfully", brand });
            else
                throw Object.assign(new Error('Image not found'), { status: 404 });
        }
        else
            throw Object.assign(new Error("Brand doesn't exist"), { status: 404 });
    } catch (error) {
        next(error);
    }
}
