const express = require('express');

const {
    getAllDOs,
    createDO,
    addDoToExpenses,
    removeDoFromExpenses,
    removeDoFromAllExpenses,
} = require('../../controllers/do');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { createDOvalidator, addRemoveExpensesValidator } = require('./doValidators');
const validtorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', getAllDOs);
router.post('/', adminMiddleware, createDOvalidator, validtorHandler, createDO);

router.patch('/:doId/add-expenses', adminMiddleware, addRemoveExpensesValidator, addDoToExpenses);
router.delete(
    '/:doId/remove-expenses',
    adminMiddleware,
    addRemoveExpensesValidator,
    removeDoFromExpenses
);
router.delete('/:doId/empty', adminMiddleware, removeDoFromAllExpenses);

module.exports = router;
