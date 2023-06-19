const { body, param } = require('express-validator');

exports.add = [
    body("productId")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID is not valid"),

    body("score")
        .notEmpty().withMessage("Score is required")
        .isInt().withMessage("Score can only be integer"),

    body("comment")
        .optional()
        .isString().withMessage("Comments can only be string values")
]

exports.getByProduct = [
    param("id")
        .isMongoId().withMessage("Product ID is not valid")
]