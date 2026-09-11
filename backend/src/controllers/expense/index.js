const _ = require('lodash');
const { Op } = require('sequelize');

const { Expense } = require('../../models');

const {
    addSingleExpenseInTheDoService,
    getSingleExpenseService,
} = require('../../services/expense');

const { prepareFiltersForAllExpenses } = require('../../queryHelper/expenses');
const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');

const { UserRole } = require('../../constants/roles');
const { HTTP_STATUS } = require('../../constants/http');
const { UnauthorizationError } = require('../../utilities/errors/ApiError');

const getAllExpenses = async (req, res, next) => {
    try {
        const { page, limit, title, description, fromDate, toDate } = req.query;
        const filter = prepareFiltersForAllExpenses({
            page,
            limit,
            title,
            description,
            fromDate,
            toDate,
        });

        const [expenses, expensesCount] = await Promise.all([
            Expense.findAll({
                include: [
                    {
                        association: 'creator',
                        attributes: ['id', 'firstName', 'lastName'],
                    },
                    {
                        association: 'do',
                        attributes: ['id', 'shopName', 'doItem', 'amount', 'doDate'],
                    },
                ],
                where: filter.where,
                limit: filter.limit,
                offset: filter.offset,
                order: ['expenseAt'],
            }),
            Expense.count({ where: filter.where }),
        ]);

        return res.status(HTTP_STATUS.OK).json({ expenses, expensesCount });
    } catch (error) {
        next(error);
    }
};

const createExpense = async (req, res, next) => {
    try {
        const { amount, title, description, expenseAt } = req.body;

        await Expense.create({
            amount: Number(amount),
            title,
            description,
            createdBy: req.user.id,
            expenseAt: new Date(expenseAt),
        });

        return res.status(HTTP_STATUS.OK).json({
            message: 'successfull',
        });
    } catch (error) {
        next(error);
    }
};

const getSingleExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;

        const expense = await getSingleExpenseService(expenseId, req.user);

        return res.status(HTTP_STATUS.OK).json({ expense });
    } catch (error) {
        next(error);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const { expenseID } = req.params;
        const { amount, title, description, expenseAt } = req.body;
        const { id: userId } = req.user;
        const newEditHistory = [];

        if (isNaN(Number(expenseID))) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'invalid expense ID',
            });
        }

        const expense = await Expense.findOne({
            where: {
                isDeleted: false,
                id: expenseID,
            },
        });

        if (!expense) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'expense not found',
            });
        }

        if (expense.createdBy !== userId) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'you can not delete this expense',
            });
        }

        if (amount !== expense.amount) {
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

        if (new Date(expenseAt).getTime() != new Date(expense.expenseAt).getTime()) {
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

        return res.status(HTTP_STATUS.OK).json({
            message: 'successfull',
        });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const { expenseID } = req.params;

        if (isNaN(Number(expenseID))) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'invalid expense ID.',
            });
        }

        const expense = await Expense.findOne({
            where: {
                isDeleted: false,
                id: expenseID,
            },
        });

        if (!expense) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'expense not found',
            });
        }

        expense.isDeleted = true;
        expense.expenseEditHistory = {
            last_updated_by: req.user.id,
            history: [
                ..._.get(expense, 'expenseEditHistory.history', []),
                {
                    task_type: 'delete',
                    task_by: req.user.id,
                    task_at: new Date(),
                },
            ],
        };

        await expense.save();

        return res.status(HTTP_STATUS.OK).json({
            message: 'expense deleted',
        });
    } catch (error) {
        next(error);
    }
};

const deleteMultipleExpenses = async (req, res, next) => {
    try {
        const { expenseIDX } = req.body;
        const expenseIDXasTableID = (expenseIDX || []).map((item) => parseInt(item.id));

        const expenses = await Expense.findAll({
            where: {
                id: {
                    [Op.in]: expenseIDXasTableID,
                },
                isDeleted: false,
            },
        });

        (expenses || []).forEach((expense) => {
            expense.isDeleted = true;
            expense.expenseEditHistory = {
                last_updated_by: req.user.id,
                history: [
                    ..._.get(expense, 'expenseEditHistory.history', []),
                    {
                        task_type: 'delete',
                        task_by: req.user.id,
                        task_at: new Date(),
                    },
                ],
            };
        });

        await Promise.all((expenses || []).map(async (expense) => await expense.save()));

        return res.status(HTTP_STATUS.OK).json({
            message: 'expense deleted',
        });
    } catch (error) {
        next(error);
    }
};

const getTotalExpense = async (req, res, next) => {
    try {
        const { title, created_by, fromDate, toDate } = req.query;
        const filter = prepareFiltersForAllExpenses({
            title,
            created_by,
            fromDate,
            toDate,
        });

        const totalExpense = await Expense.sum('amount', { where: filter.where });

        return res.status(HTTP_STATUS.OK).json({ totalExpense });
    } catch (error) {
        next(error);
    }
};

const addExpensesToDOs = async (req, res, next) => {
    try {
        const payload = Array.isArray(req.body) ? req.body : _.get(req, 'body.idx', []);

        if (!Array.isArray(payload) || payload.length === 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'invalid payload',
            });
        }

        const expenseIDX = payload.map((item) => Number(item.expenseId));
        const expenseToDOMap = payload.reduce((acc, item) => {
            acc[Number(item.expenseId)] = Number(item.doId);

            return acc;
        }, {});

        const expenses = await Expense.findAll({
            where: {
                id: {
                    [Op.in]: expenseIDX,
                },
                isDeleted: false,
            },
        });

        (expenses || []).forEach((expense) => {
            if (expenseToDOMap[expense.id]) {
                expense.doId = expenseToDOMap[expense.id];
            }
        });

        await Promise.all((expenses || []).map(async (expense) => await expense.save()));

        return res.status(HTTP_STATUS.OK).json({
            message: 'successfull',
        });
    } catch (error) {
        next(error);
    }
};

const addSingleExpenseToDo = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const { doId } = req.body;

        await addSingleExpenseInTheDoService(req.user.id, expenseId, doId);

        return res.status(HTTP_STATUS.OK).json({
            mesaage: 'expense added to DO',
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseDetails = async (req, res, next) => {
    try {
        if (req.user.role === UserRole.USER) {
            throw new UnauthorizationError('you can not access the expense edit history');
        }

        const { expenseId } = req.params;

        const expense = await getSingleExpenseService(expenseId, req.user);
        let expenseEditHistory = _.get(expense, 'expenseEditHistory', null);

        delete expenseEditHistory.last_updated_by;

        if (expenseEditHistory !== null && !!expense.lastUpdater) {
            expenseEditHistory = {
                ...expenseEditHistory,
                lastUpdater: expense.lastUpdater,
            };
        }

        return res.status(HTTP_STATUS.OK).json({ expenseEditHistory });
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
    addExpensesToDOs,
    addSingleExpenseToDo,
    getExpenseDetails,
};
