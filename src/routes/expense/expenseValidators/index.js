const { check } = require('express-validator');
const { isDate } = require('lodash');

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

        return isDate(new Date(expenseAt));
    }),
];

module.exports = { createExpenseValidator };
