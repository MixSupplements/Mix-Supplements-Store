const { query, param, body } = require("express-validator");

exports.adminLogin = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage('Username is not valid'),
  body("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("stayLoggedIn")
    .optional()
    .isBoolean()
    .withMessage("stayLoggedIn value is not valid"),
];

exports.login = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage('Email is not valid'),
  body("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("stayLoggedIn")
    .optional()
    .isBoolean()
    .withMessage("stayLoggedIn value is not valid"),
];
