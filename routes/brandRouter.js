const express = require('express');
const validations = require('../middlewares/validations/brandValidation');
const errorHandler = require('../middlewares/validations/errorHandler');
const uploader = require('../middlewares/uploadMiddleware');
const controller = require('../controllers/brandController');
const guard = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/brands', controller.index);
router.get('/brand/:id', validations.getOne, errorHandler, controller.getProducts);

router.post('/brand/:id/upload', guard.isAdmin, uploader, controller.addImage);
router.delete('/brand/:id/unload/:image', guard.isAdmin, controller.removeImage);

router.post('/brand', guard.isAdmin, validations.add, errorHandler, controller.add);
router.patch('/brand/:id', guard.isAdmin, validations.update, errorHandler, controller.update);
router.delete('/brand/:id', guard.isAdmin, validations.destroy, errorHandler, controller.destroy);

module.exports = router