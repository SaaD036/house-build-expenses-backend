const {
    addAccessToHouseService,
    removeUserAccessesFromHouseService,
    fetchAvailableUserListForHouseAccess,
} = require('../../services/houses/houseAccessService');

const { sendApiSuccessResponse } = require('../../utilities/apiUtils/apiResponseHandler');

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
 * @desciption    Remove access for single user from house
 * @route         DELETE /api/house/:houseId/revoke-access/:userId
 * @access        Admin, Creator
 */
const removeSingleUserAccessFromHouse = async (req, res, next) => {
    try {
        const { houseId, userId } = req.params;

        const data = await removeUserAccessesFromHouseService(houseId, [userId], req.user);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Access revoked',
            data,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desciption    Remove access for multi-users from house
 * @route         POST /api/house/:houseId/revoke-access
 * @access        Admin, Creator
 */
const removeMultipleUserAccessesFromHouse = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { userIdxPayload } = req.body;
        const userIdx = [...new Set(userIdxPayload.map((idx) => idx.id))];

        const data = await removeUserAccessesFromHouseService(houseId, userIdx, req.user);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Access revoked',
            data,
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
    removeSingleUserAccessFromHouse,
    removeMultipleUserAccessesFromHouse,
};
