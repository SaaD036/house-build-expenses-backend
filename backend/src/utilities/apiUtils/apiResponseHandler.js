const { BACKEND_ENVIRONMENT } = require('../../constants');

/**
 * @description API Success Response Helper
 *
 * @param {Object} res
 * @param {Object} params
 * @param {number} params.statusCode
 * @param {string} params.message
 * @param {Object|null} params.data
 * @param {Object|null} params.meta
 */
const sendApiSuccessResponse = (res, params) => {
    const { statusCode = 200, message = 'Success', data = null, meta = null } = params;

    const response = {
        success: true,
        statusCode,
        message,
        data,
    };

    if (meta) {
        response.meta = meta;
    }

    return res.status(statusCode).json(response);
};

/**
 * @description API Error Response Helper
 * @param {Object} res
 * @param {Object} params
 * @param {number} params.statusCode
 * @param {string} params.message
 * @param {Object|null} params.errors
 * @param {string|null} params.errorTrace
 */
const sendApiErrorResponse = (res, params) => {
    const {
        statusCode = 500,
        message = 'Internal Server Error',
        errors = null,
        errorTrace = null,
    } = params;

    const response = {
        success: false,
        statusCode,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    if (errorTrace && BACKEND_ENVIRONMENT === 'development') {
        response.errorTrace = errorTrace;
    }

    return res.status(statusCode).json(response);
};

/**
 * @description API Pagination Data Helper
 * @param {number} totalItems
 * @param {number} itemsPerPage
 * @param {number} currentPage
 */
const preparePaginationResponse = (totalItems, currentPage, itemsPerPage) => {
    return {
        totalItems,
        itemsPerPage: Number(itemsPerPage),
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage: Number(currentPage),
    };
};

module.exports = {
    sendApiErrorResponse,
    sendApiSuccessResponse,
    preparePaginationResponse,
};
