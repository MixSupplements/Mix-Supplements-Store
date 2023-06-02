const express = require('express');

const validation = require('../middlewares/validations/brandValidation');
const validator = require('../middlewares/validations/validator');
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