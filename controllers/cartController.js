const express = require('express');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Customer = mongoose.model('Customer');

exports.index = (req, res, next) => {
    Customer.findOne({ _id: req.decodedToken.id, deleted: false})
        .select('cart')
        .populate('cart.product')
        .then(cart => {
            res.status(200).json(cart);
        })
        .catch(error => next(error))
}

/**
 * add a product to the cart
 * should check the availability before adding
 */
exports.add = async (req, res, next) => {
    let productId = req.params.id;
    let quantityToAdd = req.body?.quantity || 1;

    try
    {
        const product = await Product.findOne({ _id: productId, deleted: false });
        const customer = await Customer.findOne({ _id: req.decodedToken.id, deleted: false }).select('cart');
        let cart = customer.cart;
        let productInCart = cart.find((element) => element.product == productId);

        if (productInCart)
        {
            if ((productInCart.quantity + quantityToAdd) <= product.quantity)
                productInCart.quantity += quantityToAdd;
            else
                throw Object.assign(new Error("Not enough products in the store"), { status: 422 });
        }
        else
        {
            if (quantityToAdd <= product.quantity)
                cart.push({
                    product: productId,
                    quantity: quantityToAdd
                });
            else
                throw Object.assign(new Error("Not enough products in the store"), { status: 422 });
        }

        await customer.save();
        res.status(200).json({ message: "Product added to the cart" })

    } catch (error) { next(error); }
}

/**
 * Decrease the quantity of the product in cart by 1
 */
exports.decrease = async (req, res, next) => {
    let productId = req.params.id;

    try
    {
        const productInStore = await Product.findOne({ _id: productId, deleted: false });
        const customer = await Customer.findOne({ _id: req.decodedToken.id, deleted: false }).select('cart');
        let cart = customer.cart;
        let product = cart.find((element) => element.product == productId);

        if (product)
        {
            if ((product.quantity - 1) <= productInStore.quantity)
                product.quantity--;
            else
                product.quantity = product.quantity;
        }
        else
        {
            throw Object.assign(new Error("Product not found"), { status: 422 });
        }

        if (product.quantity <= 0)
            cart.pull(product);

        await customer.save();
        res.status(200).json({ message: "Cart Updated" })

    } catch (error) { next(error); }
}

/**
 * Remove the product from the cart
 */
exports.remove = async (req, res, next) => {
    let productId = req.params.id;

    try
    {
        const customer = await Customer.findOne({ _id: req.decodedToken.id, deleted: false }).select('cart');
        let cart = customer.cart;
        let product = cart.find((element) => element.product == productId);

        if (product)
            cart.pull(product);
        else
            throw Object.assign(new Error("Product not found"), { status: 422 });

        await customer.save();
        res.status(200).json({ message: "Cart Updated" })

    } catch (error) { next(error); }
}

/**
 * empty the current customer's cart
 */
exports.reset = (req, res, next) => {
    Customer.updateOne({ _id: req.decodedToken.id }, { cart: [] })
        .then(() => {
            res.status(200).json({ message: "Cart cleared" });
        })
        .catch(error => next(error))
}

