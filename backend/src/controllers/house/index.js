const { createHouseService } = require('../../services/houses');

const { HTTP_STATUS } = require('../../constants/http');

/**
 * @desciption    Create a new House
 * @route         POST /api/house
 * @access        All
 */
const createHouse = async (req, res, next) => {
    try {
        const { name, address, floorCount } = req.body;

        await createHouseService(name, address, floorCount, req.user);

        return res.status(HTTP_STATUS.OK).json({
            message: 'house created',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createHouse,
};
