const productController = require("../controllers/productController");
const validator = require("../middlewares/validations/productValidation");
const errorHandler = require("../middlewares/validations/errorHandler");
const router = require("express").Router();

router
  .route("/products")
  .get(productController.getAllProducts)
  .post(validator.addProduct, errorHandler, productController.addNewProduct);

router
  .route("/products/:id")
  .get(productController.getProductById)
  .patch(validator.addProduct, errorHandler, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
