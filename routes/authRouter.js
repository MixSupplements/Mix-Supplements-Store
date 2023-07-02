const express = require("express");
const controller = require("../controllers/AuthController");
const validations = require("./../middlewares/validations/authValidations");
const errorHandler = require("../middlewares/validations/errorHandler");
const guard = require('./../middlewares/AuthMiddleware');

const router = express.Router();

router.post("/admin/login", validations.adminLogin, errorHandler, controller.adminLogin);
router.post("/login", validations.login, errorHandler, controller.login);
router.route("/logout").post(guard.Authenticate, controller.logout);
router.post("/verify", controller.verify)


module.exports = router;
