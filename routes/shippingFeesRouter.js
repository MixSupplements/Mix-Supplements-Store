const express = require("express");
const controller = require("./../controllers/shippingFeesController");
const validator = require("./../middlewares/validation/shippingValidation");
const validationError = require("./../middlewares/validation/validationError");
const router = express.Router();

router
  .route("/shipping")
  .get(controller.getAllShippingInfo)
  .post(
    validator.editShipping,
    validationError,
    controller.addShippingGovernate
  );

router
  .route("/shipping/:id")
  .get(controller.getOneshippingInfo)
  .patch(
    validator.editShipping,
    validationError,
    controller.updateShippingGovernate
  );

module.exports = router;
