const express = require('express');

const controller = require('../controllers/adminController');

const router = express.Router();

router.route('/admin')
    .post(controller.postAdmin)

module.exports = router;