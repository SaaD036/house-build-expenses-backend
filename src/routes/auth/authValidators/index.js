const { check } = require('express-validator');

const loginValidator = [
    check('email').isEmail().withMessage('Email is required and should be valid.'),
    check('password')
        .custom((value) => (value || '').length > 0)
        .withMessage('Password is required.'),
];

const forgotPasswordValidator = [
    check('email').isEmail().withMessage('Email is required and should be valid.'),
];

const resetPasswordValidator = [
    check('email').isEmail().withMessage('Email is required and should be valid.'),
    check('verificationCode')
        .custom((value) => (value || '').toString().length === 6)
        .withMessage('Invalid code.'),
    check('password')
        .custom((value) => (value || '').length >= 8)
        .withMessage('Password is required and must have at least 8 character.'),
];

module.exports = {
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
};
