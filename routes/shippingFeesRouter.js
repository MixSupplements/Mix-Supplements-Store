const express = require("express");
const controller = require("./../controllers/shippingFeesController");
const router = express.Router();

router
  .route("/shipping")
  .get(controller.getAllShippingInfo)
  .post(controller.addShippingGovernate);

router
  .route("/shipping/:id")
  .get(controller.getOneshippingInfo)
  .patch(controller.updateShippingGovernate);

module.exports = router;
