const controller = require('../controllers/productController');
const validations = require('./../middlewares/validations/productValidation');
const errorHandler = require('./../middlewares/validations/errorHandler');
const uploader = require('../middlewares/uploadMiddleware');
const guard = require('../middlewares/AuthMiddleware');

const router = require('express').Router();

router.get('/products', controller.index);
router.get('/product/:id', controller.getOne);
router.get('/product/search/:searchText', validations.search, errorHandler, controller.search);

router.post('/product/:id', guard.isAdmin, validations.create, errorHandler, controller.create);
router.patch('/product/:id/upload', guard.isAdmin, uploader, controller.addImage);
router.patch('/product/:id/unload/:image', guard.isAdmin, controller.removeImage);
router.patch('/product/:id', guard.isAdmin, validations.update, errorHandler, controller.update);
router.delete('/product/:id', guard.isAdmin, validations.destroy, errorHandler, controller.destroy);

module.exports = router;