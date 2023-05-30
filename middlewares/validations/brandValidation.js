const {param,body} = require("express-validator");

exports.postBrand = [
    body("name").isAlpha('en-US', {ignore: ' '}).withMessage("brand name should alphabetical"),
    body("logo").isString().withMessage("brand image url should be a proper image url")
]

exports.getBrandById = [
    param('id').isMongoId().withMessage("brand id should be a mongo id")
]

exports.patchBrand = [
    param('id').isMongoId().withMessage("brand id should be a mongo id"),
    body("name").optional().isAlpha('en-US', {ignore: ' '}).withMessage("brand name should alphabetical"),
    body("logo").optional().isString().withMessage("brand image url should be a proper image url")
]

exports.deleteBrand = [
    param('id').isMongoId().withMessage("brand id should be a mongo id")
]