const express = require('express');

const controller = require('../controllers/wishlistController');

const router = express.Router();

router.route('/wishlist/:id')
    .get(controller.getWishlist)
    .patch(controller.addTohWishlist)
    .delete(controller.deleteWishlist)
router.route('/wishlist/:id/:productId')
    .patch(controller.removeFromWishlist)

module.exports = router;