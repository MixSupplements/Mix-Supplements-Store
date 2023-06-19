const { param, body } = require("express-validator");

exports.add = [
    param("id")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID is not valid"),
    body("quantity")
        .optional()
        .isInt({ min: 1 }).withMessage("Quantity is not valid")
]

exports.decrease = [
    param("id")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID is not valid"),
]

exports.remove = [
    param("id")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID is not valid"),
]
