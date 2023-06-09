const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const uploadMW = require('../middlewares/uploadMiddleware')


router.patch('/upload/products/add', uploadMW, uploadController.addProductImage)
router.patch('/upload/products/remove/:productId/:imageId', uploadController.removeProductImage)

router.patch('/upload/brands/add', uploadMW, uploadController.addBrandImage)
router.patch('/upload/brands/remove/:brandId/:imageId', uploadController.removeBrandImage)

module.exports = router;