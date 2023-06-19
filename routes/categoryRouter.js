const express = require("express");
const controller = require("../controllers/categoryController");
const validations = require("../middlewares/validations/categoryValidation");
const errorHandler = require("../middlewares/validations/errorHandler");
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get("/categories", controller.index);
router.get("/category/:id", controller.getProducts);

router.post("/category", guard.isAdmin, validations.add, errorHandler, controller.add);
router.patch("/category/:id", guard.isAdmin, validations.update, errorHandler, controller.update)
router.delete("/category/:id", guard.isAdmin, validations.destroy, errorHandler, controller.destroy);

module.exports = router;
