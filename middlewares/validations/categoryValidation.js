const { body, param } = require("express-validator");

exports.add = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must be alphabets only"),
];

exports.update = [
  param('id')
    .isMongoId().withMessage("Category ID is not valid"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must be alphabets only"),
]

exports.destroy = [
  param('id')
    .isMongoId().withMessage("Category ID is not valid"),
]