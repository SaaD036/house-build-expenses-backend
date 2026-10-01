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

module.exports = {
    addAccessForSingleUserValidator,
};
