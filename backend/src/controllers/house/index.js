const {
    fetchHouseListService,
    createHouseService,
    updateHouseService,
    fetchHouseDetailsBySlugService,
    deleteHouseService,
} = require('../../services/houses');

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

/**
 * @desciption    Get a house details
 * @route         POST /api/house/:houseSlug
 * @access        Admin, Creator and Accessed
 */
const getSingleHouseBySlug = async (req, res, next) => {
    try {
        const { houseSlug } = req.params;

        const house = await fetchHouseDetailsBySlugService(houseSlug, req.user);

        return res.status(HTTP_STATUS.OK).json({
            house,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desciption    Update a house
 * @route         PUT /api/house/:id
 * @access        Admin, Creator
 */
const updateHouse = async (req, res, next) => {
    try {
        const { houseId } = req.params;

        await updateHouseService(houseId, req.body, req.user);

        return res.status(HTTP_STATUS.OK).json({
            message: 'house updated',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desciption    Delete a house
 * @route         DELETE /api/house/:id
 * @access        Admin, Creator
 */
const deleteHouse = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const loggedInUser = req.user;

        await deleteHouseService(houseId, loggedInUser);

        return res.status(HTTP_STATUS.OK).json({
            message: 'house deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllHouses,
    createHouse,
    getSingleHouseBySlug,
    updateHouse,
    deleteHouse,
};
