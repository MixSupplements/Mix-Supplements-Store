const express = require('express');

const validation = require('../middlewares/validations/adminValidation');
const validator = require('../middlewares/validations/errorHandler');
const controller = require('../controllers/adminController');

const router = express.Router();

router.route('/admin')
    .post(validation.postAdmin,
        validator,
        controller.postAdmin)
router.route('/admin/:id')
    .patch(validation.patchAdmin,
        validator,
        controller.patchAdmin)
    .delete(validation.deleteAdmin,
        validator,
        controller.deleteAdmin)

module.exports = router;