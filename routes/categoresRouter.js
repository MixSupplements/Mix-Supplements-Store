const express = require("express");
const controller = require("./../controllers/categoresController");
const validator = require("./../middlewares/validation/categoryValidation");
const validationError = require("./../middlewares/validation/validationError");
const router = express.Router();

router
  .route("/category")
  .get(controller.getAllCategory)
  .post(validator.addCategory, validationError, controller.addCategory);

router
  .route("/category/:id")
  .get(controller.getOneCategory)
  .patch(validator.addCategory, validationError, controller.updateOneCategory)
  .delete(controller.deletCategory);

module.exports = router;
