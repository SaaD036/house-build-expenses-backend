const express = require('express');

const {
    getAllDOs,
    createDO,
    addDoToExpenses,
    removeDoFromExpenses,
    removeDoFromAllExpenses,
} = require('../../controllers/do');

const houseAccessMiddleware = require('../../middlewares/HouseAccessMiddleware');

const { createDOvalidator, addRemoveExpensesValidator } = require('./doValidators');

const { HOUSE_ACCESS_TYPE } = require('../../constants/houses/houseAccess');

const router = express.Router({ mergeParams: true });

router.get('/', houseAccessMiddleware(HOUSE_ACCESS_TYPE.VIEWER), getAllDOs);
router.post(
    '/',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    createDOvalidator,
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    createDO
);

router.patch(
    '/:doId/add-expenses',
    addRemoveExpensesValidator,
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    addDoToExpenses
);
router.delete(
    '/:doId/remove-expenses',
    addRemoveExpensesValidator,
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    removeDoFromExpenses
);
router.delete(
    '/:doId/empty',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    removeDoFromAllExpenses
);

module.exports = router;
