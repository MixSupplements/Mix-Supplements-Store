const express = require("express");
const controller = require("../controllers/ordersController");
const validations = require("./../middlewares/validations/orderValidations");
const errorHandler = require("./../middlewares/validations/errorHandler");
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get("/orders", guard.isAdmin, controller.index);
router.get("/orders/:orderNumber", guard.Authenticate, controller.getOrder);
router.route("/order").post(guard.isCustomer, validations.create, errorHandler, controller.create);
router.route("/order/:id").patch(guard.Authenticate, validations.updateStatus, errorHandler, controller.updateStatus);

module.exports = router;