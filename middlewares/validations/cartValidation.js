const {param,body} = require("express-validator");

exports.getCart = [
    param("id").isMongoId().withMessage("id should be a mongo id")
]

exports.addToCart = [
    param("id").isMongoId().withMessage("id should be a mongo id"),
    body("productId").isMongoId().withMessage("product id should be a mongo id")
]

exports.deleteCart = [
    param("id").isMongoId().withMessage("id should be a mongo id")
]

exports.removeFromCart = [
    param("id").isMongoId().withMessage("id should be a mongo id"),
    param("productId").isMongoId().withMessage("product id should be a mongo id")
]