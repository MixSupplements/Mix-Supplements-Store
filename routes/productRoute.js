const productController = require("../controllers/productController");
const express = require("express");
const validator = require("./../middlewares/validation/productValidation");
const validationError = require("./../middlewares/validation/validationError");

const router = require("express").Router();

router
  .route("/products")
  .get(productController.getAllProducts)
  .post(validator.addProduct, validationError, productController.addNewProduct);

router
  .route("/products/:id")
  .get(productController.getProductById)
  .patch(validator.addProduct, validationError, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
