const express = require('express');

const {
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
} = require('./authValidators');
const validtorHandler = require('../validatorHandler');

const { login, forgotPassword, resetPassword } = require('../../controllers/auth');

const router = express.Router();

router.post('/login', loginValidator, validtorHandler, login);
router.post('/forgot-password', forgotPasswordValidator, validtorHandler, forgotPassword);
router.post('/reset-password', resetPasswordValidator, validtorHandler, resetPassword);

module.exports = router;
