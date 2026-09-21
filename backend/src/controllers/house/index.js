const { fetchHouseListService, createHouseService } = require('../../services/houses');

const { HTTP_STATUS } = require('../../constants/http');

/**
 * @desciption    Fetch houses list
 * @route         GET /api/house
 * @access        All
 */
const getAllHouses = async (req, res, next) => {
    try {
        const { name, ownerName, floorCount, floorCountOperator, page, limit } = req.query;
        const { housesList, houseCount } = await fetchHouseListService(
            {
                name,
                ownerName,
                floorCount,
                floorCountOperator,
                limit: isNaN(limit) ? 10 : Number(limit),
                page: isNaN(page) ? 1 : Number(page),
            },
            req.user
        );

        return res.status(HTTP_STATUS.OK).json({
            houses: housesList,
            houseCount,
        });
    } catch (error) {
        next(error);
    }
};

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
    getAllHouses,
    createHouse,
};
