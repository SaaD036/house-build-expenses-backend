const express = require('express');
const router = express.Router();

const {
    getAllExpenses,
    createExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    deleteMultipleExpenses,
    getTotalExpense,
    addExpensesToDOs,
    addSingleExpenseToDo,
    getExpenseDetails,
} = require('../../controllers/expense');

const adminMiddleware = require('../../middlewares/auth/Admin');

const {
    createExpenseValidator,
    deleteMultipleExpensesValidator,
    addToDOvalidator,
    addSingleExpenseToDoValidator,
} = require('./expenseValidators');
const validatorHandler = require('../validatorHandler');

router.get('/', getAllExpenses);
router.post('/', adminMiddleware, createExpenseValidator, validatorHandler, createExpense);

router.delete(
    '/delete-multiple',
    adminMiddleware,
    deleteMultipleExpensesValidator,
    validatorHandler,
    deleteMultipleExpenses
);
router.get('/get-total-expense', getTotalExpense);
router.post('/add-to-do', addToDOvalidator, validatorHandler, addExpensesToDOs);

router.post(
    '/:expenseId/add-to-do',
    addSingleExpenseToDoValidator,
    validatorHandler,
    addSingleExpenseToDo
);
router.get('/:expenseId/edit-history', adminMiddleware, getExpenseDetails);

router.get('/:expenseId', getSingleExpense);
router.patch(
    '/:expenseID',
    adminMiddleware,
    createExpenseValidator,
    validatorHandler,
    updateExpense
);
router.delete('/:expenseID', adminMiddleware, deleteExpense);

module.exports = router;
