const express = require('express');
const router = express.Router();
const controller = require('./../controllers/CustomerController');

// these endpoint need to be tested after user registration 
router.get('/user/:id', controller.getCurrent);
router.get('/user/:id/orders', controller.getOrders);
router.patch('/user', controller.update);
router.delete('/user', controller.destroy);


/*************************************************************
 * dummy endpoint to create Customers (until registration works)
 */
router.post('/user', controller.add);
/*********************************************************** */

module.exports = router;