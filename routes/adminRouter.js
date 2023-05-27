const express = require('express');

const controller = require('../controllers/adminController');

const router = express.Router();

router.route('/admin')
    .post(controller.postAdmin)
router.route('/admin/:id')
    .patch(controller.patchAdmin)
    // .delete(controller.deleteAdmin)

module.exports = router;