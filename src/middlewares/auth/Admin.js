const { get } = require('lodash');

const { UserRole } = require('../../constants/roles');

const AdminMiddleware = (req, res, next) => {
    try {
        if (get(req, 'user.role', UserRole.VISITOR) != UserRole.ADMIN) {
            return res.status(401).json({
                message: 'you are unauthorized',
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            message: 'you are unauthorized',
        });
    }
};

module.exports = AdminMiddleware;
