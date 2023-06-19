const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');
const Product = mongoose.model('Product');

exports.index = (req, res, next) => {
    Brand.find({})
        .select('-__v')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => next(error))
}

exports.add = (req, res, next) => {
    let { name } = req.body;
    let brand = new Brand({ name: name })
    brand.save()
        .then(data => {
            res.status(200).json({ message: "Brand added successfully" })
        })
        .catch(error => next(error))
}

exports.getProducts = (req, res, next) => {

    Product.find({ brand: req.params.id, deleted: false }).select('-__v')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => next(error))
}

exports.update = (req, res, next) => {
    Brand.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        .then(updated => {
            if (updated)
                res.status(200).json({ message: "Brand updated successfully" });
            else
                throw Object.assign(new Error('Brand not found'), { status: 422 });
        })
        .catch(error => next(error))
}


exports.addImage = async (request, response, next) => {

    /**
     * ToDo: 
     * only one logo can be uploaded
     */

    try
    {
        const brand = await Brand.findOneAndUpdate({ _id: request.params.id }, {
            $set: { logo: request.body.image }
        }, { new: true })
        if (brand)
            response.status(201).json({ message: "Image added successfully", brand });
        else
            throw Object.assign(new Error("Brand not Found"), { status: 422 });
    } catch (error)
    {
        next(error);
    }
}

exports.removeImage = async (request, response, next) => {
    try
    {
        const brand = await Brand.findOneAndUpdate({ _id: request.params.id }, {
            $set: { logo: null }
        }, { new: true })
        if (brand)
        {
            const cloudResponse = await cloudinary.uploader.destroy(request.params.image, { invalidate: true });
            if (cloudResponse.result == 'ok')
                response.status(200).json({ message: "Image deleted successfully", brand });
            else
                throw Object.assign(new Error('Image not found'), { status: 422 });
        }
        else
            throw Object.assign(new Error("Brand not Found"), { status: 422 });
    } catch (error)
    {
        next(error);
    }
}

exports.destroy = (req, res, next) => {
    Brand.deleteOne({ _id: req.params.id })
        .then(data => {
            if (data.deletedCount === 1)
                res.status(200).json({ message: "Brand deleted Successfully" });
            else
                throw Object.assign(new Error('Brand not found'), { status: 422 });
        })
        .catch(error => next(error))
}
