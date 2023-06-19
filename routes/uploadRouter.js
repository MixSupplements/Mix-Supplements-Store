const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const uploadMW = require('../middlewares/uploadMiddleware');
const guard = require('../middlewares/AuthMiddleware');


// router.patch('/upload/products/add', guard.isAdmin, uploadMW, uploadController.addProductImage)
// router.patch('/upload/products/:productId/remove/:imageId', guard.isAdmin, uploadController.removeProductImage)

router.patch('/upload/brands/add', guard.isAdmin, uploadMW, uploadController.addBrandImage)
router.patch('/upload/brands/:brandId/remove/:imageId', guard.isAdmin, uploadController.removeBrandImage)

module.exports = router;