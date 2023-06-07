const express = require('express');
const  mongoose  = require('mongoose');

const Customers = mongoose.model('Customer');

exports.getCart = (req, res, next) => {
    Customers.findById(req.params.id)
    .populate('cart')
    .then(data => {
        res.status(200).json(data.cart);
    })
    .catch(err => next(err))
}

exports.addToCart = (req, res, next) => {
    Customers.updateOne({_id: req.params.id},{$push:{cart: req.body.productId}})
    .then(data => {
        res.status(200).json({"message": "added product to cart"});
    })
    .catch(err => next(err))
}

exports.deleteCart = (req, res, next) => {
    Customers.updateOne({_id: req.params.id}, {cart: []})
    .then(data => {
        res.status(200).json({"message": "cleared cart"});
    })
    .catch(err => next(err))
}

exports.removeFromCart = (req, res, next) => {
    Customers.updateOne({_id:  req.params.id},{$pull:{cart: req.params.productId}})
    .then(data => {
        res.status(200).json({"message": "removed product from cart"});
    })
    .catch(err => next(err))
}