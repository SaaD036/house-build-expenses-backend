const { get } = require('lodash');

const { User } = require('../../models');

const { prepareQueryFilterForAllusers } = require('../../queryHelper/users');

const { HTTP_STATUS } = require('../../constants/http');

const getAllUser = async (req, res, next) => {
    try {
        const { page, limit, name, email, role, accountStatus } = req.query;
        const filter = prepareQueryFilterForAllusers({
            page,
            limit,
            name,
            email,
            role,
            accountStatus,
        });

        const users = await User.findAndCountAll({
            where: filter.where,
            limit: filter.limit,
            offset: filter.offset,
            order: ['id'],
        });

        return res.status(HTTP_STATUS.OK).json({
            users: get(users, 'rows', []),
            userCount: get(users, 'count', 0),
        });
    } catch (error) {
        next(error.message || error);
    }
};

module.exports = {
    getAllUser,
};
