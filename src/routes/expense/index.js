const express = require('express');

const { getAllExpenses, createExpense, deleteExpense } = require('../../controllers/expense');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createExpenseValidator } = require('./expenseValidators');
const validatorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', adminMiddleware, createExpenseValidator, validatorHandler, createExpense);

router.delete('/:expenseID', adminMiddleware, deleteExpense);

module.exports = router;
