const {param,body} = require("express-validator");

exports.postAdmin = [
    body('userName').isAlpha().withMessage("admin user name must be string only without numbers,spaces, or special characters"),
    body('email').isEmail().withMessage("admin email must be a proper email"),
    body('password').isStrongPassword().withMessage("admin password must be a strong password")
]

exports.patchAdmin = [
    param('id').isMongoId().withMessage("admin id should be a mongo id"),
    body('userName').optional().isAlpha().withMessage("admin user name must be string only without numbers,spaces, or special characters"),
    body('email').optional().isEmail().withMessage("admin email must be a proper email"),
    body('password').optional().isStrongPassword().withMessage("admin password must be a strong password")
]

exports.deleteAdmin = [
    param('id').isMongoId().withMessage("admin id should be a mongo id"),
]