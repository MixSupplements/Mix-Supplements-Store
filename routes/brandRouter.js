const express = require('express');

const controller = require('../controllers/brandController');

const router = express.Router();

router.route('/brands')
    .get(controller.getBrands)
module.exports = router