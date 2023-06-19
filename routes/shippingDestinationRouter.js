const express = require("express");
const controller = require("../controllers/shippingDestinationController");
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get("/shipping", guard.Authenticate, controller.index);
router.get("/shipping/:id", guard.Authenticate, controller.getOne);

router.post("/shipping", guard.isAdmin, controller.add);
router.patch("/shipping/:id", guard.isAdmin, controller.update);
router.delete("/shipping/:id", guard.isAdmin, controller.disable);

module.exports = router;
