const express = require("express");
const controller = require("./../controllers/categoresController");
const validator = require("../middlewares/validations/categoryValidation");
const errorHandler = require("../middlewares/validations/errorHandler");
const guard = require('./../middlewares/authorization');

const router = express.Router();

router
  .route("/category")
  .get(controller.getAllCategory)
  .post(guard.isAdmin, validator.addCategory, errorHandler, controller.addCategory);

router
  .route("/category/:id")
  .get(controller.getOneCategory)
  .patch(guard.isAdmin, controller.updateOneCategory)
  .delete(guard.isAdmin, controller.deleteCategory);

module.exports = router;
