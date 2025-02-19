const _ = require('lodash');
const { Op } = require('sequelize');

const { Expenses } = require('../../models');

const { prepareFiltersForAllExpenses } = require('../../queryHelper/expenses');

const { HTTP_STATUS } = require('../../constants/http');

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
            Expenses.findAll({
                include: {
                    association: 'creator',
                    attributes: ['id', 'firstName', 'lastName'],
                },
                where: filter.where,
                limit: filter.limit,
                offset: filter.offset,
            }),
            Expenses.count({
                where: filter.where,
            }),
        ]);

        return res.status(HTTP_STATUS.OK).json({
            expenses,
            expensesCount,
        });
    } catch (error) {
        next(error);
    }
};

const createExpense = async (req, res, next) => {
    try {
        const { amount, title, description, expenseAt } = req.body;

        await Expenses.create({
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

const deleteExpense = async (req, res, next) => {
    try {
        const { expenseID } = req.params;

        if (isNaN(Number(expenseID))) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Invalid expense ID.',
            });
        }

        const expense = await Expenses.findOne({
            where: {
                isDeleted: false,
                id: expenseID,
            },
        });

        if (!expense) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'Expense not found.',
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

        const expenses = await Expenses.findAll({
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

module.exports = {
    getAllExpenses,
    createExpense,
    deleteExpense,
    deleteMultipleExpenses,
};
