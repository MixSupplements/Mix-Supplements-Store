const { body } = require("express-validator");

exports.editShipping = [
  body("governorate")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Must be alphapetic [a,b,c,..]"),

  body("fees").isNumeric().withMessage("Must be numbers"),

  body("active").isBoolean().withMessage("Must be True or false"),

  body("shippingTime").isString().withMessage("Must be alphapetic [a,b,c,..]"),
];