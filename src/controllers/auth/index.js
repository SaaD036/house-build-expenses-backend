const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { HTTP_STATUS } = require('../../constants/http');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: {
                    message: 'No user found with this credential.',
                },
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
            const token = jwt.sign(
                {
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '3h',
                }
            );

            return res.status(200).json({
                message: 'login successful',
                token: token,
            });
        }

        return res.status(HTTP_STATUS.NOT_FOUND).json({
            error: {
                message: 'No user found with this credential.',
            },
        });
    } catch (error) {
        next(error.message || error);
    }
};

module.exports = {
    login,
};
