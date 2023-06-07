const express = require('express');

const validation = require('../middlewares/validations/wishlistValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/wishlistController');

const router = express.Router();

router.route('/wishlist/:id')
    .get(validation.getWishlist,
        validator,
        controller.getWishlist)
    .patch(validation.addTohWishlist,
        validator,
        controller.addTohWishlist)
    .delete(validation.deleteWishlist,
        validator,
        controller.deleteWishlist)
router.route('/wishlist/:id/:productId')
    .patch(validation.removeFromWishlist,
        validator,
        controller.removeFromWishlist)

module.exports = router;