const express = require('express');

const validation = require('../middlewares/validations/adminValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/adminController');
const guard = require('./../middlewares/authorization');


const router = express.Router();

router.route('/admin')
    .post(guard.isAdmin,
        validation.postAdmin,
        validator,
        controller.postAdmin)
router.route('/admin/:id')
    .patch(guard.isAdmin,
        validation.patchAdmin,
        validator,
        controller.patchAdmin)
    .delete(guard.isAdmin,
        validation.deleteAdmin,
        validator,
        controller.deleteAdmin)

module.exports = router;