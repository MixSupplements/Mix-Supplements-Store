const { param, body } = require("express-validator");

exports.add = [
    body("name")
        .isAlpha('en-US', { ignore: ' ' }).withMessage("Brand name should only be alphabets")
]

exports.getOne = [
    param('id')
        .isMongoId().withMessage("Brand ID is not valid")
]

exports.update = [
    param('id')
        .isMongoId().withMessage("Brand ID is not valid"),
    body("name")
        .optional().isAlpha('en-US', { ignore: ' ' }).withMessage("Brand name should only be alphabets")
]

exports.destroy = [
    param('id')
        .isMongoId().withMessage("Brand ID is not valid")
]