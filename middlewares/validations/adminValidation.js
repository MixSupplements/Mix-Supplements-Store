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
        .isMongoId().withMessage("admin id should be a mongo id"),
    body('userName').optional().isAlpha().withMessage("admin user name must be string only without numbers,spaces, or special characters"),
    body('email').optional().isEmail().withMessage("admin email must be a proper email"),
    body('password').optional().isStrongPassword().withMessage("admin password must be a strong password")
]

exports.destroy = [
    param('id').isMongoId().withMessage("admin id should be a mongo id"),
]