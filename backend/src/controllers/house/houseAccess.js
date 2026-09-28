const { addAccessToHouseService } = require('../../services/houses/houseAccessService');

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

module.exports = { addAccessToHouseForSingleUser, addAccessToHouseForMultipleUser };
