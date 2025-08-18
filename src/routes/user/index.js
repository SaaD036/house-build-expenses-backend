const express = require('express');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { getAllUser, createUser } = require('../../controllers/user');

const { createUserValidator } = require('./userValidators');
const validtorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', adminMiddleware, getAllUser);
router.post('/', adminMiddleware, createUserValidator, validtorHandler, createUser);

module.exports = router;
