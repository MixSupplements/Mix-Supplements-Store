const { param, body } = require("express-validator");

exports.addCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name can't be empty!!")
    .isString()
    .withMessage("Must be alphapetic [a,b,c,..]"),
];
