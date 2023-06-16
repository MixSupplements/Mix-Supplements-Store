const express = require("express");
const controller = require("../controllers/ordersController");
const router = express.Router();
const guard = require('./../middlewares/authorization');

router.get("/orders", guard.isAdmin, controller.index);
router.get("/orders/:orderNumber", controller.getOrder);

router.route("/order")
  .post(controller.create)
  .patch(controller.update)
  .delete(controller.destroy)

module.exports = router;