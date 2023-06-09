const express = require("express");
const controller = require("../controllers/loginController");
const { loginArray } = require("./../middlewares/validations/loginValidation");
const validator = require("../middlewares/validations/errorHandler");
const router = express.Router();

router.route("/login").post(loginArray, validator, controller.isAuthenticated);

module.exports = router;
