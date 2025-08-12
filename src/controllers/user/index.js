const { get } = require('lodash');
const { literal } = require('sequelize');

const { User } = require('../../models');

const { prepareQueryFilterForAllusers } = require('../../queryHelper/users');

const { HTTP_STATUS } = require('../../constants/http');
const { UserRole } = require('../../constants/roles');

const getAllUser = async (req, res, next) => {
    try {
        const { page, limit, name, email, role, accountStatus } = req.query;
        const loggedInUserRole = get(req, 'user.role', UserRole.USER);
        const filter = prepareQueryFilterForAllusers({
            page,
            limit,
            name,
            email,
            role,
            accountStatus,
        });

        const [users, totalUsers] = await Promise.all([
            User.findAll({
                where: filter.where,
                limit: filter.limit,
                offset: filter.offset,
                include: {
                    association: 'expenses',
                    attributes: [],
                },
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'role',
                    'accountStatus',
                    'accountEditHistory',
                    [
                        literal(`(
                        SELECT COUNT("expenses"."id") FROM "expenses"
                        WHERE "expenses"."created_by" = "User"."id"
                    )`),
                        'totalExpenseCount',
                    ],
                ],
                order: [['id', 'ASC']],
            }),
            User.count({
                where: filter.where,
            }),
        ]);

        const flatUsers = users.map((user) => user.get({ plain: true }));

        const updatedUsers = (flatUsers || []).map((user) => {
            if (loggedInUserRole === UserRole.USER) {
                delete user.totalExpenseCount;
            }

            return user;
        });

        return res.status(HTTP_STATUS.OK).json({
            users: updatedUsers || [],
            totalUsers,
        });
    } catch (error) {
        next(error.message || error);
    }
};

module.exports = {
    getAllUser,
};
