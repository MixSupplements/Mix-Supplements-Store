const express = require("express");
const controller = require("./../controllers/categoresController");
const validator = require("./../middlewares/validation/categoryValidation");
const router = express.Router();

router
  .route("/category")
  .get(controller.getAllCategory)
  .post(validator.addCategory, controller.addCategory);

router
  .route("/category/:id")
  .get(controller.getOneCategory)
  .patch(controller.updateOneCategory)
  .delete(controller.deletCategory);

module.exports = router;
