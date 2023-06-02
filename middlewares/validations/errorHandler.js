const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
        const error = new Error('Validation failed');
        error.status = 422;
        error.errors = errors.array();
        return next(error);
    }
    next();
};
