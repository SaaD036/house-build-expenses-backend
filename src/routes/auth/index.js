const express = require('express');

const { loginValidator, forgotPasswordValidator } = require('./authValidators');
const validtorHandler = require('../validatorHandler');

const { login, forgotPassword } = require('../../controllers/auth');

const router = express.Router();

router.post('/login', loginValidator, validtorHandler, login);
router.post('/forgot-password', forgotPasswordValidator, validtorHandler, forgotPassword);

module.exports = router;
