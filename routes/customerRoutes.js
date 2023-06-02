const express = require('express');
const router = express.Router();
const controller = require('./../controllers/CustomerController');
const validations = require('./../middlewares/validations/customerValidations');
const errorHandler = require('./../middlewares/validations/errorHandler');

// these endpoint need to be tested after user registration 
router.get('/user/:id', controller.getCurrent);
router.get('/user/:id/orders', controller.getOrders);
router.patch('/user', validations.updateValidations, errorHandler, controller.update);
router.delete('/user', validations.deleteValidations, errorHandler, controller.destroy);


/*************************************************************
 * dummy endpoint to create Customers (until registration works)
 */
router.post('/user', validations.addValidations, errorHandler, controller.add);
/*********************************************************** */

module.exports = router;