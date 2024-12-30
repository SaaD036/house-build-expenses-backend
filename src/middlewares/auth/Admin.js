const { get } = require('lodash');

const { UserRole } = require('../../constants/roles');
const { HTTP_STATUS } = require('../../constants/http');

const AdminMiddleware = (req, res, next) => {
    try {
        if (get(req, 'user.role', UserRole.VISITOR) != UserRole.ADMIN) {
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

module.exports = AdminMiddleware;
