const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getAllExpenses,
    createExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    deleteMultipleExpenses,
    getTotalExpense,
    addSingleExpenseToDo,
    getExpenseEditHistory,
    getDoDetailsForExpense,
} = require('../../controllers/expense');

const houseAccessMiddleware = require('../../middlewares/HouseAccessMiddleware');

const {
    createExpenseValidator,
    deleteMultipleExpensesValidator,
    addSingleExpenseToDoValidator,
} = require('./expenseValidators');

const { HOUSE_ACCESS_TYPE } = require('../../constants/houses/houseAccess');

/**
 * @description API: /api/house/:houseId/expense
 */
router.get(
    '/',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.VIEWER, {
        addHouseToRequest: true,
    }),
    getAllExpenses
);
router.post(
    '/',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR),
    createExpenseValidator,
    createExpense
);

/**
 * @description API: /api/house/:houseId/expense/{other-route-part}
 */
router.delete(
    '/delete-multiple',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR),
    deleteMultipleExpensesValidator,
    deleteMultipleExpenses
);
router.get('/get-total-expense', houseAccessMiddleware(HOUSE_ACCESS_TYPE.VIEWER), getTotalExpense);

/**
 * @description API: /api/house/:houseId/expense/:{expenseId}/{other-route-part}
 */
router.post(
    '/:expenseId/add-to-do',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR),
    addSingleExpenseToDoValidator,
    addSingleExpenseToDo
);
router.get(
    '/:expenseId/edit-history',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR, {
        allowedForVisitorAdmin: true,
        addHouseToRequest: true,
    }),
    getExpenseEditHistory
);
router.get(
    '/:expenseId/do-details',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.VIEWER, { addHouseToRequest: true }),
    getDoDetailsForExpense
);

/**
 * @description API: /api/house/:houseId/expense/:{expenseId}
 */
router.get(
    '/:expenseId',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.VIEWER, { addHouseToRequest: true }),
    getSingleExpense
);
router.patch(
    '/:expenseID',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR),
    createExpenseValidator,
    updateExpense
);
router.delete('/:expenseID', houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR), deleteExpense);

module.exports = router;
