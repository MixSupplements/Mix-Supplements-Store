const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

router
  .route("/orders")
  .get(ordersController.getAllOrders)
  .post(ordersController.addOrder);

router
  .route("/orders/:id")
  .patch(ordersController.updateOrder)
  .get(ordersController.getOrderById)
  .delete(ordersController.deleteOrder);

module.exports = router;
