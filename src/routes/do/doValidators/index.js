const { check } = require('express-validator');
const { isDate } = require('lodash');

const validtorHandler = require('../../validatorHandler');

const createDOvalidator = [
    check('shopName')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Shop name must have 5 characters at least'),
    check('shopAddress')
        .custom((value) => {
            if (!value.area) {
                return false;
            }

            if (!value.ward) {
                return false;
            }

            if (!value.upazilla) {
                return false;
            }

            if (!value.district) {
                return false;
            }

            return true;
        })
        .withMessage('Shop address must includes area, ward, upazilla and disctrict'),
    check('doItem')
        .trim()
        .isLength({ min: 3 })
        .withMessage('DO item must have 3 characters at least'),
    check('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Description must have 10 characters at least'),
    check('amount')
        .custom((value) => {
            if (isNaN(Number(value))) {
                return false;
            }

            return true;
        })
        .withMessage('Amount must be a number')
        .isInt({ min: 1 })
        .withMessage('Amount must me 1 or more'),
    check('doDate')
        .custom((value) => {
            if (!value) {
                true;
            }

            return isDate(new Date(value));
        })
        .withMessage('DO date format invalid'),
];

const addExpensesValidator = [
    check('expenseIdx').isArray({ min: 1 }).withMessage('expense id is required'),
    check('expenseIdx.*.id').trim().isLength({ min: 1 }).withMessage('expense id must be valid'),
    validtorHandler,
];

module.exports = { createDOvalidator, addExpensesValidator };
