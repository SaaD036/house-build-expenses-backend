const { User } = require('../../models');

const { HTTP_STATUS } = require('../../constants/http');

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll();

        users.accountEditHistory = JSON.parse(users.accountEditHistory);

        return res.status(HTTP_STATUS.OK).json({
            users,
        });
    } catch (error) {
        next(error.message || error);
    }
};

module.exports = {
    getAllUser,
};
