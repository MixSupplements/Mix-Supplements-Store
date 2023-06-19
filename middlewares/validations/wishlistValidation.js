const { param } = require("express-validator");


exports.add = [
    param("id").isMongoId().withMessage("Product ID is not valid")
]

exports.remove = [
    param("id").isMongoId().withMessage("Product ID is not valid")
]