const { body } = require("express-validator");

exports.add = [
  body("governorate")
    .notEmpty().withMessage("Governorate is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Governorate name can only be alphabets"),

  body("fees")
    .notEmpty().withMessage("Fees is required")
    .isNumeric().withMessage("Fees can only be numbers"),

  body("shippingDays")
    .notEmpty().withMessage("Shipping days is required")
    .isInt().withMessage("Shipping time can only be integers"),
];

exports.update = [
  body("governorate")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Governorate name can only be alphabets"),

  body("fees")
    .optional()
    .isNumeric().withMessage("Fees can only be numbers"),

  body("shippingDays")
    .optional()
    .isString().withMessage("Shipping days can only be integers"),
];
