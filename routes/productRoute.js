const controller = require('../controllers/productController');
const validations = require('./../middlewares/validations/productValidation');
const errorHandler = require('./../middlewares/validations/errorHandler');
const uploader = require('../middlewares/uploadMiddleware');
const guard = require('../middlewares/AuthMiddleware');

const router = require('express').Router();

router.get('/products', controller.index);
router.get('/product/:id', controller.getOne);
router.post('/product/:id', guard.isAdmin, validations.create, errorHandler, controller.create);
router.patch('/upload/product/:id/add', guard.isAdmin, uploader, controller.addImage);
router.patch('/upload/products/:productId/remove/:imageId', guard.isAdmin, controller.removeImage);
router.patch('/product/:id', guard.isAdmin, validations.update, errorHandler, controller.update);
router.delete('/product/:id', guard.isAdmin, validations.destroy, errorHandler, controller.destroy);

module.exports = router;