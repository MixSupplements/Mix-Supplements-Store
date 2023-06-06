const mongoose = require('mongoose');

const Brands = mongoose.model('Brand');

exports.getBrands = (req, res, next) => {
    Brands.find({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => next(err))
}

exports.postBrand = (req, res, next) => {
    let { name } = req.body;
    let newBrand = new Brands({ name: name })
    newBrand.save()
        .then(data => {
            res.status(200).json({ "message": "brand added successfully", data })
        })
        .catch(err => next(err))
}

exports.getBrandById = (req, res, next) => {
    Brands.findById(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => next(err))
}

exports.patchBrand = (req, res, next) => {
    Brands.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            res.status(200).json({ "message": "brand updated successfully", data });
        })
        .catch(err => next(err))
}

exports.deleteBrand = (req, res, next) => {
    Brands.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ "message": "brand deleted Successfully", data })
        })
        .catch(err => next(err))
}
