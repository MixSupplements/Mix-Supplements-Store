const { body } = require("express-validator");

exports.addCategory = [
  body("name")
    .notEmpty()
    .isAlpha()
    .withMessage("Must be alphapetic [a,b,c,..]"),
];
