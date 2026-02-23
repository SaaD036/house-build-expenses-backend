const { check } = require('express-validator');
const { isDate, isArray } = require('lodash');
const { Op } = require('sequelize');

const { DOs, Expenses } = require('../../../models');

const createExpenseValidator = [
    check('amount')
        .custom((value) => !isNaN(Number(value) && Number(value) > 0))
        .withMessage('Amount must be a number.'),
    check('title')
        .custom((value) => {
            if (typeof value !== 'string') {
                return false;
            }

            return value.toString().trim().length > 0;
        })
        .withMessage('Title can not be empty'),
    check('description')
        .custom((value) => {
            if (typeof value !== 'string') {
                return false;
            }

            return value.toString().trim().length > 0;
        })
        .withMessage('Description can not be empty'),
    check('expenseAt').custom((value) => {
        if (!value) {
            true;
        }

        return isDate(new Date(value));
    }),
];

const deleteMultipleExpensesValidator = [
    check('expenseIDX')
        .custom((value) => {
            if (!isArray(value)) {
                return false;
            }

            const valueArrayWithNotNumber = (value || []).filter((item) => isNaN(Number(item.id)));

            if (valueArrayWithNotNumber.length > 0) {
                return false;
            }

            return true;
        })
        .withMessage('Expense IDs are not valid.'),
];

const addToDOvalidator = [
    check('idx')
        .custom((value) => {
            if (!isArray(value)) {
                return false;
            }

            const valueArrayWithInvalidIDX = (value || []).filter((item) => {
                if (isNaN(Number(item.expenseId))) {
                    return true;
                }

                if (isNaN(Number(item.doId))) {
                    return true;
                }
            });

            if (valueArrayWithInvalidIDX.length > 0) {
                return false;
            }

            return true;
        })
        .withMessage('Invalid expense/do ID')
        .custom(async (value) => {
            const expenseIDX = value.map((item) => item.expenseId);
            const doIDX = value.map((item) => item.doId);

            try {
                const [expenses, dos] = await Promise.all([
                    await Expenses.findAll({
                        where: {
                            id: {
                                [Op.in]: expenseIDX,
                            },
                            isDeleted: false,
                        },
                        attributes: ['id'],
                    }),
                    await DOs.findAll({
                        where: {
                            id: {
                                [Op.in]: doIDX,
                            },
                            isDeleted: false,
                        },
                        attributes: ['id'],
                    }),
                ]);

                const dbExpenseIDX = expenses.map((item) => item.id);
                const invalidExpenseIDx = expenseIDX.filter((item) => !dbExpenseIDX.includes(item));

                const dbDOidx = dos.map((item) => item.id);
                const invalidDOidx = doIDX.filter((item) => !dbDOidx.includes(item));

                if (invalidExpenseIDx.length > 0 || invalidDOidx.length > 0) {
                    return Promise.reject();
                }
            } catch (error) {
                return Promise.reject();
            }
        })
        .withMessage('Some expense/do id does not exist'),
];

module.exports = { createExpenseValidator, deleteMultipleExpensesValidator, addToDOvalidator };
