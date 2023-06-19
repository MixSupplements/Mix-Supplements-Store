const { body } = require("express-validator");

exports.add = [
  body("governorate")
    .notEmpty().withMessage("Governorate is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Governorate name can only be alphabets"),

  body("fees")
    .notEmpty().withMessage("Fees is required")
    .isNumeric().withMessage("Fees can only be numbers"),

  body("shippingTime")
    .notEmpty().withMessage("Shipping time is required")
    .isString().withMessage("Shipping time can only be string"),
];

exports.update = [
  body("governorate")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Governorate name can only be alphabets"),

  body("fees")
    .optional()
    .isNumeric().withMessage("Fees can only be numbers"),

  body("shippingTime")
    .optional()
    .isString().withMessage("Shipping time can only be string"),
];
