const express = require('express');

const validation = require('../middlewares/validations/brandValidation');
const validator = require('../middlewares/validations/validator');
const controller = require('../controllers/brandController');

const router = express.Router();

router.route('/brands')
    .get(controller.getBrands)
    .post(controller.postBrand)
router.route('/brand/:id')
    .get(controller.getBrandById)
    .patch(controller.patchBrand)
    .delete(controller.deleteBrand)
module.exports = router