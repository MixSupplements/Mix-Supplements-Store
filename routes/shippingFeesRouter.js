const express = require("express");
const controller = require("./../controllers/shippingFeesController");
const router = express.Router();
const guard = require('./../middlewares/authorization');

router
  .route("/shipping")
  .get(guard.isAdmin, controller.getAllShippingInfo)
  .post(guard.isAdmin, controller.addShippingGovernate);

router
  .route("/shipping/:id")
  .get(controller.getOneshippingInfo)
  .patch(guard.isAdmin, controller.updateShippingGovernate);

module.exports = router;
