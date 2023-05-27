const express = require('express');

const controller = require('../controllers/brandController');

const router = express.Router();

router.route('/brands')
    .get(controller.getBrands)
    .post(controller.postBrand)
router.route('/brand/:id')
    .get(controller.getBrandById)
module.exports = router