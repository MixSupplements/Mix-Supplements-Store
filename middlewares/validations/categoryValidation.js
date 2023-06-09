const { param, body } = require("express-validator");

exports.addCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name can't be empty!!")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Must be alphapetic [a,b,c,..]"),
];

