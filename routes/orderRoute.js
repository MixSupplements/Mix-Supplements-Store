const express = require("express");
const controller = require("../controllers/ordersController");
const router = express.Router();
const guard = require('./../middlewares/authorization');

router.get("/orders", guard.isAdmin, controller.index);
router.get("/orders/:orderNumber", controller.getOrder);

router.route("/order").post(guard.isCustomer, controller.create);
router.route("/order").patch(controller.updateStatus);

module.exports = router;