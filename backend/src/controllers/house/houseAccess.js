const {
    addAccessToHouseService,
    fetchAvailableUserListForHouseAccess,
} = require('../../services/houses/houseAccessService');

const { HTTP_STATUS } = require('../../constants/http');

/**
 * @desciption    Add access for a single user to house
 * @route         POST /api/house/:houseId/add-access
 * @access        Admin, Creator
 */
const addAccessToHouseForSingleUser = async (req, res, next) => {
    try {
        const { userId, accessType } = req.body;

        await addAccessToHouseService([{ userId, accessType }], req.house, req.user);

        return res.status(HTTP_STATUS.CREATED).json({
            message: 'access created',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desciption    Add access for multiple users to house
 * @route         POST /api/house/:houseId/add-multiple-access
 * @access        Admin, Creator
 */
const addAccessToHouseForMultipleUser = async (req, res, next) => {
    try {
        const { houseSlug } = req.params;

        await addAccessToHouseService(houseSlug, req.user);

        return res.status(HTTP_STATUS.CREATED).json({
            message: 'access created',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desciption    Fetch available users for a house to access
 * @route         GET /api/house/:houseId/users-for-access
 * @access        Admin, Creator
 */
const getAvailableUsersForHouseAccess = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, searchTerm = '' } = req.query;
        const { users, totalUserCount } = await fetchAvailableUserListForHouseAccess(req.house, {
            page,
            limit,
            searchTerm,
        });

        return res.status(HTTP_STATUS.OK).json({
            users,
            totalUserCount,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAccessToHouseForSingleUser,
    addAccessToHouseForMultipleUser,
    getAvailableUsersForHouseAccess,
};
