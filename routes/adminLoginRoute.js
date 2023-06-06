const express = require("express");
const controller = require("../controllers/adminLoginController");
const { loginArray } = require("./../middlewares/validations/loginValidation");
const validator = require("../middlewares/validations/errorHandler");
const router = express.Router();

router
  .route("/admin/login")
  .post(loginArray, validator, controller.isAuthenticated);

module.exports = router;
