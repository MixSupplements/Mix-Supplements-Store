const express = require('express');

const validations = require('../middlewares/validations/wishlistValidation');
const errorHandler = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/wishlistController');
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/wishlist', guard.isCustomer, controller.index);
router.post('/wishlist/:id', guard.isCustomer, validations.add, errorHandler, controller.add);
router.delete('/wishlist/:id', guard.isCustomer, validations.remove, errorHandler, controller.remove);
router.delete('/wishlist', guard.isCustomer, controller.reset);



module.exports = router;