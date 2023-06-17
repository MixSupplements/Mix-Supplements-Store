const express = require('express');
const router = express.Router();
const controller = require('./../controllers/CustomerController');
const validations = require('./../middlewares/validations/customerValidations');
const errorHandler = require('./../middlewares/validations/errorHandler');
const guard = require('./../middlewares/authorization');

// these endpoint need to be tested after user registration 
router.get('/user/:id', controller.getCurrent);
router.get('/user/:id/orders', controller.getOrders);
router.patch('/user', guard.isCustomer, validations.updateValidations, errorHandler, controller.update);
router.delete('/user', guard.isCustomer, validations.deleteValidations, errorHandler, controller.destroy);

module.exports = router;