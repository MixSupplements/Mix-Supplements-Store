const express = require('express');

const controller = require('../controllers/cartController');

const router = express.Router();

router.route('/cart/:id')
    .get(controller.getCart)
    .patch(controller.addToCart)
    .delete(controller.deleteCart)
router.route('/cart/:id/:productId')
    .patch(controller.removeFromCart)

module.exports = router;