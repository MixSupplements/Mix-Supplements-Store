const express = require('express');

const validation = require('../middlewares/validations/cartValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/cartController');
const guard = require('./../middlewares/authorization');


const router = express.Router();

router.route('/cart/:id')
    .get(guard.isCustomer, validation.getCart, validator, controller.getCart)
    .patch(guard.isCustomer, validation.addToCart, validator, controller.addToCart)
    .delete(guard.isCustomer, validation.deleteCart, validator, controller.deleteCart)
router.route('/cart/:id/:productId')
    .patch(guard.isCustomer, validation.removeFromCart, validator, controller.removeFromCart)

module.exports = router;