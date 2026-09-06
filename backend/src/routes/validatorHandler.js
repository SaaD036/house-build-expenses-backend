const { validationResult } = require('express-validator');
const { isEmpty } = require('lodash');

const { getErrorResponse } = require('../utilities/api');

const { HTTP_STATUS } = require('../constants/http');

const validtorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    const validationErrorsArray = [];
    const validationErrorResponse = {
        message: null,
    };

    if (isEmpty(mappedError)) {
        next();
        return;
    }

    (Object.keys(mappedError) || []).forEach((key) => {
        if (mappedError[key].msg) {
            validationErrorsArray.push(mappedError[key].msg);
        }
    });

    if (validationErrorsArray.length === 1) {
        validationErrorResponse.message = validationErrorsArray[0];
    } else if (validationErrorsArray.length >= 2) {
        validationErrorResponse.message = validationErrorsArray;
    }

    return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(getErrorResponse(validationErrorResponse.message));
};

module.exports = validtorHandler;
