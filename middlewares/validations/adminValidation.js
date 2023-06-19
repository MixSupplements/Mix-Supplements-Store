const { param, body } = require("express-validator");

exports.add = [
    body('username')
        .notEmpty().withMessage("Username is required")
        .isAlphanumeric().withMessage("Username must be alphanumeric string without special characters"),
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is not valid"),
    body('password')
        .isStrongPassword().withMessage("Password is weak")
]

exports.update = [
    param('id')
        .isMongoId().withMessage("ID is not valid"),
    body('email')
        .optional().isEmail().withMessage("Email is not valid"),
    body('password')
        .optional().isStrongPassword().withMessage("Password is weak")
]

exports.destroy = [
    param('id').isMongoId().withMessage("ID is not valid"),
]