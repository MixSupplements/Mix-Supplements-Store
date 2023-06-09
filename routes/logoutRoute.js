const express = require("express");
const controller = require("../controllers/logoutController");
const router = express.Router();

router.route("/logout").post(controller.logout);

module.exports = router;
