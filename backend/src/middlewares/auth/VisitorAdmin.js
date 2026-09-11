const get = require('lodash/get');

const { UserRole } = require('../../constants/roles');
const { HTTP_STATUS } = require('../../constants/http');

const VisitorAdminMiddleware = (req, res, next) => {
    try {
        if (get(req, 'user.role', UserRole.USER) === UserRole.USER) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'you are unauthorized',
            });
        }

        next();
    } catch (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: 'you are unauthorized',
        });
    }
};

module.exports = VisitorAdminMiddleware;
