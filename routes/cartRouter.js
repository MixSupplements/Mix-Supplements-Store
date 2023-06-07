const express = require('express');

const validation = require('../middlewares/validations/cartValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/cartController');

const router = express.Router();

router.route('/cart/:id')
    .get(validation.getCart,
        validator,
        controller.getCart)
    .patch(validation.addToCart,
        validator,
        controller.addToCart)
    .delete(validation.deleteCart,
        validator,
        controller.deleteCart)
router.route('/cart/:id/:productId')
    .patch(validation.removeFromCart,
        validator,
        controller.removeFromCart)

module.exports = router;