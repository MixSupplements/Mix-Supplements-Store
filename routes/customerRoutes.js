const express = require('express');
const controller = require('./../controllers/CustomerController');
const validations = require('./../middlewares/validations/customerValidations');
const errorHandler = require('./../middlewares/validations/errorHandler');
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post("/register", validations.register, errorHandler, controller.register);

router.get('/user/:id', guard.Authenticate, controller.getCurrent);
router.get('/user/:id/orders', guard.Authenticate, controller.getOrders);
router.patch('/user', guard.isCustomer, validations.updateValidations, errorHandler, controller.update);
router.delete('/user', guard.isCustomer, validations.deleteValidations, errorHandler, controller.destroy);

module.exports = router;