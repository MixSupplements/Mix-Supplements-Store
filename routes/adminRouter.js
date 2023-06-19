const express = require('express');
const validations = require('../middlewares/validations/adminValidation');
const errorHandler = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/adminController');
const guard = require('../middlewares/AuthMiddleware');


const router = express.Router();

router.post('/admin', guard.isAdmin, validations.add, errorHandler, controller.add);
router.patch('/admin/:id', guard.isAdmin, validations.update, errorHandler, controller.update);
router.delete('/admin/:id', guard.isAdmin, validations.destroy, errorHandler, controller.destroy);

module.exports = router;