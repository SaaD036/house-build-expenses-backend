const express = require('express');

const {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    deleteMultipleExpenses,
    getTotalExpense,
} = require('../../controllers/expense');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createExpenseValidator, deleteMultipleExpensesValidator } = require('./expenseValidators');
const validatorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', adminMiddleware, createExpenseValidator, validatorHandler, createExpense);

router.patch(
    '/:expenseID',
    adminMiddleware,
    createExpenseValidator,
    validatorHandler,
    updateExpense
);
router.delete('/:expenseID', adminMiddleware, deleteExpense);
router.patch(
    '/delete-multiple',
    adminMiddleware,
    deleteMultipleExpensesValidator,
    validatorHandler,
    deleteMultipleExpenses
);

router.get('/get-total-expense', getTotalExpense);

module.exports = router;
