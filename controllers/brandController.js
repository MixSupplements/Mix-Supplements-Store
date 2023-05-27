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
