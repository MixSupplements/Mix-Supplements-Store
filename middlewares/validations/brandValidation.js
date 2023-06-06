const { param, body } = require("express-validator");

exports.postBrand = [
    body("name").isAlpha('en-US', { ignore: ' ' }).withMessage("brand name should alphabetical")
]

exports.getBrandById = [
    param('id').isMongoId().withMessage("brand id should be a mongo id")
]

exports.patchBrand = [
    param('id').isMongoId().withMessage("brand id should be a mongo id"),
    body("name").optional().isAlpha('en-US', { ignore: ' ' }).withMessage("brand name should alphabetical")
]

exports.deleteBrand = [
    param('id').isMongoId().withMessage("brand id should be a mongo id")
]