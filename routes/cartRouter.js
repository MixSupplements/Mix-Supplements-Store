const express = require('express');
const validations = require('../middlewares/validations/cartValidation');
const errorHandler = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/cartController');
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/cart', guard.isCustomer, controller.index);
router.post('/cart/:id', guard.isCustomer, validations.add, errorHandler, controller.add);
router.patch('/cart/:id/decrease', guard.isCustomer, validations.decrease, errorHandler, controller.decrease);
router.delete('/cart/:id', guard.isCustomer, validations.remove, errorHandler, controller.remove);
router.delete('/cart', guard.isCustomer, controller.reset);

module.exports = router;