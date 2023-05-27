const express = require('express');
const  mongoose  = require('mongoose');

const Brands = mongoose.model('Brand');

exports.getBrands = (req, res, next) => {
    Brands.find({})
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => next(err))
}

exports.postBrand = (req, res, next) => {
    let {name, logo} = req.body;

    let newBrand = new Brands({
        name: name,
        logo: logo
    })

    newBrand.save()
    .then(data => {
        res.status(200).json({"message": "brand added successfully"})
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
