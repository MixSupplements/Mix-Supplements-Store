const express = require("express");
const customerValidation = require("../middlewares/validations/customerValidations");
const validator = require("../middlewares/validations/errorHandler");
const controller = require("../controllers/registerController");
const router = express.Router();

router
  .route("/register")
  .post(customerValidation.addValidations, validator, controller.signUp);

module.exports = router;
