const { query, param, body } = require("express-validator");
exports.loginArray = [
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("stayLoggedIn")
    .isBoolean()
    .withMessage("please choose if you want to stay logged in on this device"),
];
