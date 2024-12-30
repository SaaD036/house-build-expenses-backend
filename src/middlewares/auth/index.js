const jwt = require('jsonwebtoken');

const { HTTP_STATUS } = require('../../constants/http');

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    const token =
        (authorization || '').split(' ').length >= 1 ? (authorization || '').split(' ')[1] : null;

    try {
        if (!authorization || !token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'unauthenticated',
            });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'unauthenticated',
            });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: 'unauthenticated',
        });
    }
};

module.exports = auth;
