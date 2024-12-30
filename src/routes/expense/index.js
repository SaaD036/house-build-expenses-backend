const express = require('express');

const { getAllExpenses, createExpense } = require('../../controllers/expense');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createExpenseValidator } = require('./expenseValidators');
const validatorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', adminMiddleware, createExpenseValidator, validatorHandler, createExpense);

module.exports = router;
