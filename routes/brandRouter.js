const express = require('express');

const validation = require('../middlewares/validations/brandValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/brandController');
const guard = require('./../middlewares/authorization');


const router = express.Router();

router.route('/brands')
    .get(guard.isAdmin, controller.getBrands)
    .post(guard.isAdmin, validation.postBrand, validator, controller.postBrand)
router.route('/brand/:id')
    .get(validation.getBrandById, validator, controller.getBrandById)
    .patch(guard.isAdmin, validation.patchBrand, validator, controller.patchBrand)
    .delete(guard.isAdmin, validation.deleteBrand, validator, controller.deleteBrand)

module.exports = router