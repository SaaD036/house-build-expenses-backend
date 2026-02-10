const { get } = require('lodash');
const { literal } = require('sequelize');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

const {
    prepareQueryFilterForAllusers,
    prepareQueryToFetchSingleUser,
} = require('../../queryHelper/users');

const { generateRandomPassword } = require('../../utilities/stringUtilities');

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

const createUser = async (req, res, next) => {
    try {
        const { email, firstName, lastName, role, accountStatus } = req.body;
        const hashedPassword = await bcrypt.hash(generateRandomPassword(), 10);

        await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            role,
            accountStatus,
        });

        return res.status(HTTP_STATUS.OK).json({
            message: 'successfull',
        });
    } catch (error) {
        next(error.message || error);
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const loggedInUserRole = get(req, 'user.role', UserRole.USER);
        const query = prepareQueryToFetchSingleUser(userId);

        const user = await User.findOne(query);

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'user not found',
            });
        }

        if (loggedInUserRole === UserRole.USER) {
            delete user.accountEditHistory;
        }

        return res.status(HTTP_STATUS.OK).json({
            user,
        });
    } catch (error) {
        next(error.message || error);
    }
};

const getLoggedInUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const query = prepareQueryToFetchSingleUser(id);

        const user = await User.findOne(query);

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'user not found',
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            user,
        });
    } catch (error) {
        next(error.message || error);
    }
};

module.exports = {
    getAllUser,
    createUser,
    getSingleUser,
    getLoggedInUser,
};
