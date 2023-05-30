const express = require('express');

const validation = require('../middlewares/validations/brandValidation');
const validator = require('../middlewares/validations/validator');
const controller = require('../controllers/brandController');

const router = express.Router();

router.route('/brands')
    .get(controller.getBrands)
    .post(validation.postBrand,
        validator,
        controller.postBrand)
router.route('/brand/:id')
    .get(validation.getBrandById,
        validator,
        controller.getBrandById)
    .patch(validation.patchBrand,
        validator,
        controller.patchBrand)
    .delete(validation.deleteBrand,
        validator,
        controller.deleteBrand)
module.exports = router