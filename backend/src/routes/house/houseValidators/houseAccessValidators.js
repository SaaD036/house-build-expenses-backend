const { check } = require('express-validator');

const ValidationHandler = require('../../validatorHandler');

const { HOUSE_ACCESS_TYPE } = require('../../../constants/houses/houseAccess');

const addAccessForSingleUserValidator = [
    check('userId').trim().notEmpty().withMessage('user id must be non-empty'),
    check('accessType')
        .isIn([HOUSE_ACCESS_TYPE.VIEWER, HOUSE_ACCESS_TYPE.CONTRIBUTOR])
        .withMessage('accessType is invalid'),
    ValidationHandler,
];

const removeMultipleAccessesFromHouseValidator = [
    check('userIdxPayload')
        .isArray()
        .withMessage('payload must be a valid array')
        .custom((value) => {
            if (value.length === 0) {
                return false;
            }

            let flag = true;

            for (const idx of value) {
                if (isNaN(idx.id)) {
                    flag = false;
                }
            }

            return flag;
        })
        .withMessage('invalid payload'),
    ValidationHandler,
];

module.exports = {
    addAccessForSingleUserValidator,
    removeMultipleAccessesFromHouseValidator,
};
