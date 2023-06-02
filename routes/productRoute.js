const productController = require('../controllers/productController');

const router = require('express').Router();

router.route('/products')
    .get(productController.getAllProducts)
    .post(productController.addNewProduct)

router.route('/products/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;