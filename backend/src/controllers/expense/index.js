const _ = require('lodash');

const { Expense } = require('../../models');

const {
    deleteExpenseService,
    removeExpensesService,
    getSingleExpenseService,
    addSingleExpenseInTheDoService,
    getDoDetailsForExpenseService,
} = require('../../services/expense');

const {
    sendApiSuccessResponse,
    sendApiErrorResponse,
    preparePaginationResponse,
} = require('../../utilities/apiUtils/apiResponseHandler');
const { hasTwoDateSameDay } = require('../../utilities/dateUtilities');
const { prepareFiltersForAllExpenses } = require('../../queryHelper/expenses');
const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');

const { HTTP_STATUS } = require('../../constants/http');

const getAllExpenses = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { page = 1, limit = 10, title, description, fromDate, toDate } = req.query;
        const filter = prepareFiltersForAllExpenses({
            page,
            limit,
            title,
            description,
            fromDate,
            toDate,
        });

        const [expenses, expensesCount] = await Promise.all([
            Expense.scope({ method: ['houseScope', houseId] }).findAll({
                include: [
                    {
                        association: 'creator',
                        attributes: ['id', 'firstName', 'lastName'],
                    },
                    {
                        association: 'do',
                        attributes: ['id', 'shopName', 'doItem', 'amount', 'doDate'],
                        required: false,
                    },
                ],
                where: filter.where,
                limit: filter.limit,
                offset: filter.offset,
                order: ['expenseAt'],
            }),
            Expense.scope({ method: ['houseScope', houseId] }).count({ where: filter.where }),
        ]);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expenses list fetched',
            data: { house: req.house, expenses },
            meta: preparePaginationResponse(expensesCount, Number(page), Number(limit)),
        });
    } catch (error) {
        next(error);
    }
};

const createExpense = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { amount, title, description, expenseAt } = req.body;

        const expense = await Expense.create({
            amount: Number(amount),
            title,
            houseId,
            description,
            createdBy: req.user.id,
            expenseAt: new Date(expenseAt),
        });

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: 'Expense created',
            data: { expense },
        });
    } catch (error) {
        next(error);
    }
};

const getSingleExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;

        const expense = await getSingleExpenseService(req.house, expenseId);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expense fetched',
            data: { expense },
        });
    } catch (error) {
        next(error);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const { houseId, expenseID } = req.params;
        const { amount, title, description, expenseAt } = req.body;
        const { id: userId } = req.user;
        const newEditHistory = [];

        const expense = await Expense.scope({ method: ['houseScope', houseId] }).findOne({
            where: {
                id: expenseID,
            },
        });

        if (!expense) {
            return sendApiErrorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: 'Expense not found',
                errorTrace: `Expense with id = ${expenseID} not found`,
            });
        }

        if (Number(amount) !== Number(expense.amount)) {
            newEditHistory.push(
                createExpenseEditHistoryItem('update', 'amount', userId, amount, expense.amount)
            );
        }

        if (title !== expense.title) {
            newEditHistory.push(
                createExpenseEditHistoryItem('update', 'title', userId, title, expense.title)
            );
        }

        if (description !== expense.description) {
            newEditHistory.push(
                createExpenseEditHistoryItem(
                    'update',
                    'description',
                    userId,
                    description,
                    expense.description
                )
            );
        }

        if (!!expenseAt && !hasTwoDateSameDay(expenseAt, expense.expenseAt)) {
            newEditHistory.push(
                createExpenseEditHistoryItem(
                    'update',
                    'expenseAt',
                    userId,
                    new Date(expenseAt),
                    expense.expenseAt
                )
            );
        }

        expense.amount = Number(amount);
        expense.title = title;
        expense.description = description;
        expense.expenseAt = expenseAt ? new Date(expenseAt) : new Date();
        expense.expenseEditHistory = {
            last_updated_by: userId,
            history: [..._.get(expense, 'expenseEditHistory.history', []), ...newEditHistory],
        };

        await expense.save();

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expense updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const { houseId, expenseID } = req.params;

        await deleteExpenseService(houseId, expenseID, req.user.id);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expense deleted',
        });
    } catch (error) {
        next(error);
    }
};

const deleteMultipleExpenses = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { expenseIdx } = req.body;
        const expenseIDXasTableID = (expenseIdx || []).map((item) => parseInt(item.id));

        const deletedItems = await removeExpensesService(expenseIDXasTableID, houseId);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expenses deleted',
            data: deletedItems,
        });
    } catch (error) {
        next(error);
    }
};

const getTotalExpense = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { title, created_by, fromDate, toDate } = req.query;
        const filter = prepareFiltersForAllExpenses({
            title,
            created_by,
            fromDate,
            toDate,
        });

        const totalExpense = await Expense.scope({ method: ['houseScope', houseId] }).sum(
            'amount',
            {
                where: filter.where,
            }
        );

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Total expense count fetched',
            data: { totalExpense },
        });
    } catch (error) {
        next(error);
    }
};

const addSingleExpenseToDo = async (req, res, next) => {
    try {
        const { expenseId, houseId } = req.params;
        const { doId } = req.body;

        await addSingleExpenseInTheDoService(req.user.id, houseId, expenseId, doId);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expense has been enlisted under DO',
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseEditHistory = async (req, res, next) => {
    try {
        const { expenseId } = req.params;

        const expense = await getSingleExpenseService(req.house, expenseId);
        let expenseEditHistory = _.get(expense, 'expenseEditHistory', null);

        if (expenseEditHistory !== null) {
            delete expenseEditHistory.last_updated_by;

            if (expense.lastUpdater) {
                expenseEditHistory = {
                    ...expenseEditHistory,
                    lastUpdater: expense.lastUpdater,
                };
            }
        }

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expense edit history fetched',
            data: { expenseEditHistory },
        });
    } catch (error) {
        next(error);
    }
};

const getDoDetailsForExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;

        const expendeDoDetails = await getDoDetailsForExpenseService(req.house, expenseId);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'DO details fetched',
            data: { expendeDoDetails },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
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
};
