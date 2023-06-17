const express = require('express');

const validation = require('../middlewares/validations/wishlistValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/wishlistController');
const guard = require('./../middlewares/authorization');

const router = express.Router();

router.route('/wishlist/:id')
    .get(guard.isCustomer, validation.getWishlist,
        validator,
        controller.getWishlist)
    .patch(guard.isCustomer, validation.addTohWishlist,
        validator,
        controller.addTohWishlist)
    .delete(guard.isCustomer, validation.deleteWishlist,
        validator,
        controller.deleteWishlist)
router.route('/wishlist/:id/:productId')
    .patch(guard.isCustomer, validation.removeFromWishlist,
        validator,
        controller.removeFromWishlist)

module.exports = router;