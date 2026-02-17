const express = require('express');

const { getAllDOs, createDO } = require('../../controllers/do');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createDOvalidator } = require('./doValidators');
const validtorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllDOs);
router.post('/', adminMiddleware, createDOvalidator, validtorHandler, createDO);

module.exports = router;
