const { query, param, body } = require('express-validator');

exports.register = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('Name must be alphabets only'),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Name must be alphabets only'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address').normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('phoneNumber')
        .notEmpty().withMessage('Phone Number is required')
        .isMobilePhone().withMessage('Invalid phone number'),

    body('addresses.*.governorate')
        .notEmpty().withMessage('Governorate is required'),
    body('addresses.*.city')
        .notEmpty().withMessage('City is required'),
    body('addresses.*.street')
        .notEmpty().withMessage('Street is required'),
];

const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{11}$/.test(phoneNumber);
};

exports.updateValidations = [
    body('firstName')
        .optional()
        .isAlpha().withMessage('Name must be alphabets only'),

    body('lastName')
        .optional()
        .isAlpha().withMessage('Name must be characters only'),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email address').normalizeEmail(),

    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('phoneNumbers')
        .optional()
        .isArray({ min: 1 }).withMessage('Phone Numbers must be an array with at least one element')
        .custom((phoneNumbers) => {
            for (let i = 0; i < phoneNumbers.length; i++)
            {
                if (!isValidPhoneNumber(phoneNumbers[i]))
                {
                    return false;
                }
            }
            return true;
        })
];
