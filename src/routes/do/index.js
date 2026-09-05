const express = require('express');

const { getAllDOs, createDO, addDoToExpenses } = require('../../controllers/do');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createDOvalidator, addExpensesValidator } = require('./doValidators');
const validtorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllDOs);
router.post('/', adminMiddleware, createDOvalidator, validtorHandler, createDO);
router.patch('/:doId/add-expenses', adminMiddleware, addExpensesValidator, addDoToExpenses);

module.exports = router;
