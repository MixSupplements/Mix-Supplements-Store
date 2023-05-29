const express = require('express');
const  mongoose  = require('mongoose');

const Customers = mongoose.model('Customer');

exports.getWishlist = (req, res, next) => {
    Customers.findById(req.params.id)
    .populate('wishlist')
    .then(data => {
        res.status(200).json(data.wishlist);
    })
    .catch(err => next(err))
}

exports.addTohWishlist = (req, res, next) => {
    Customers.updateOne({_id: req.params.id},{$push:{wishlist: req.body.productId}})
    .then(data => {
        res.status(200).json({"message": "added product to wishlist"});
    })
    .catch(err => next(err))
}

exports.deleteWishlist = (req, res, next) => {
    Customers.updateOne({_id: req.params.id}, {wishlist: []})
    .then(data => {
        res.status(200).json({"message": "cleared wishlist"});
    })
    .catch(err => next(err))
}

exports.removeFromWishlist = (req, res, next) => {
    Customers.updateOne({_id:  req.params.id},{$pull:{wishlist: req.params.productId}})
    .then(data => {
        res.status(200).json({"message": "removed product from wishlist"});
    })
    .catch(err => next(err))
}