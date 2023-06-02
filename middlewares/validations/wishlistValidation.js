const {param,body} = require("express-validator");

exports.getWishlist = [
    param("id").isMongoId().withMessage("id should be a mongo id")
]

exports.addTohWishlist = [
    param("id").isMongoId().withMessage("id should be a mongo id"),
    body("productId").isMongoId().withMessage("product id should be a mongo id")
]

exports.deleteWishlist = [
    param("id").isMongoId().withMessage("id should be a mongo id")
]

exports.removeFromWishlist = [
    param("id").isMongoId().withMessage("id should be a mongo id"),
    param("productId").isMongoId().withMessage("product id should be a mongo id")
]