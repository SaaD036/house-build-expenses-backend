const { HTTP_STATUS } = require('../../constants/http');

class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.status = statusCode;
    }
}

class BadRequestError extends ApiError {
    constructor(message) {
        super(message, HTTP_STATUS.BAD_REQUEST);
    }
}

class UnauthorizationError extends ApiError {
    constructor(message) {
        super(message, HTTP_STATUS.UNAUTHORIZED);
    }
}

class NotFoundError extends ApiError {
    constructor(message) {
        super(message, HTTP_STATUS.NOT_FOUND);
    }
}

module.exports = { BadRequestError, UnauthorizationError, NotFoundError };
