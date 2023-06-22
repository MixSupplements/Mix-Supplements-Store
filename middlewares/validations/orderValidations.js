const { param, body } = require("express-validator");

exports.create = [
    body("customerId")
        .notEmpty().withMessage("Customer ID is required")
        .isMongoId().withMessage("Customer ID is not valid"),

    body("products")
        .notEmpty().withMessage("Products is required")
        .isArray().withMessage("Products should be any array of objects"),

    body("products.*._id")
        .notEmpty().withMessage("All Products IDs is required")
        .isMongoId().withMessage("Some Products IDs is not valid"),

    body("products.*.quantity")
        .notEmpty().withMessage("All Products quantities is required")
        .isNumeric().withMessage("Products quantities should be numbers only"),

    body("totalPrice")
        .notEmpty().withMessage("Total Price is required")
        .isNumeric().withMessage("Total Price should be a number"),

    body("shippingAddress")
        .notEmpty().withMessage("Address is required")
        .isObject().withMessage("Address should be an object"),

    body('shippingAddress.governorate')
        .notEmpty().withMessage('Governorate is required'),

    body('shippingAddress.city')
        .notEmpty().withMessage('City is required'),

    body('shippingAddress.street')
        .notEmpty().withMessage('Street is required')
]

exports.updateStatus = [
    param("id")
        .isMongoId().withMessage("ID is not valid"),

    body("status")
        .isString().withMessage("Order Status can only be string values")
]