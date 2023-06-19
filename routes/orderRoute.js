const express = require("express");
const controller = require("../controllers/ordersController");
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get("/orders", guard.isAdmin, controller.index);
router.get("/orders/:orderNumber", controller.getOrder);
router.route("/order").post(guard.isCustomer, controller.create);
router.route("/order/:id").patch(controller.updateStatus);

module.exports = router;