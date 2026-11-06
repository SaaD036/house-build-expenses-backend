const { check } = require('express-validator');

const { isHouseAddressValidated } = require('../../../utilities/houses/houseAddressUtilities');

const ValidationHandler = require('../../validatorHandler');

const createHouseValidator = [
    check('name').trim().isLength({ min: 5 }).withMessage('Name must have length 5 or more'),
    check('address').custom(isHouseAddressValidated).withMessage('Address is invalid'),
    ValidationHandler,
];

module.exports = { createHouseValidator };
