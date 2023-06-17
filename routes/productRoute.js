const productController = require('../controllers/productController');
const guard = require('./../middlewares/authorization');

const router = require('express').Router();

router.route('/products')
    .get(productController.getAllProducts)
    .post(guard.isAdmin, productController.addNewProduct)

router.route('/products/:id')
    .get(productController.getProductById)
    .patch(guard.isAdmin, productController.updateProduct)
    .delete(guard.isAdmin, productController.deleteProduct)

module.exports = router;