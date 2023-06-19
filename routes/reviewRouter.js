const router = require('express').Router();
const controller = require("./../controllers/ReviewController");
const validations = require("./../middlewares/validations/reviewValidations");
const errorHandler = require("./../middlewares/validations/errorHandler");
const guard = require("./../middlewares/AuthMiddleware");

router.post("/review", guard.isCustomer, validations.add, errorHandler, controller.add);
router.get("/review/product/:id", validations.getByProduct, errorHandler, controller.getByProduct);

module.exports = router;