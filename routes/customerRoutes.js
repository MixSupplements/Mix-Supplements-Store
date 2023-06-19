const express = require('express');
const controller = require('./../controllers/CustomerController');
const validations = require('./../middlewares/validations/customerValidations');
const errorHandler = require('./../middlewares/validations/errorHandler');
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post("/register", validations.register, errorHandler, controller.register);

router.get('/user', guard.isCustomer, controller.getCurrent);
router.get('/user/orders', guard.isCustomer, controller.getOrders);
router.patch('/user/:id', guard.isCustomer, validations.updateValidations, errorHandler, controller.update);
router.delete('/user/:id', guard.isCustomer, controller.destroy);

module.exports = router;