const express = require('express');

const {
    getAllHouses,
    createHouse,
    updateHouse,
    deleteHouse,
    getSingleHouseBySlug,
    getHouseEditHistory,
} = require('../../controllers/house');
const {
    addAccessToHouseForSingleUser,
    getAvailableUsersForHouseAccess,
    removeSingleUserAccessFromHouse,
    removeMultipleUserAccessesFromHouse,
} = require('../../controllers/house/houseAccess');

const houseAccessMiddleware = require('../../middlewares/HouseAccessMiddleware');

const {
    addAccessForSingleUserValidator,
    removeMultipleAccessesFromHouseValidator,
} = require('./houseValidators/houseAccessValidators');

const { createHouseValidator } = require('./houseValidators');
const { HOUSE_ACCESS_TYPE } = require('../../constants/houses/houseAccess');

const router = express.Router();

router.get('/', getAllHouses);
router.post('/', createHouseValidator, createHouse);

router.get(
    '/:houseId/edit-history',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR, {
        addHouseToRequest: true,
        allowedForVisitorAdmin: true,
    }),
    getHouseEditHistory
);
router.post(
    '/:houseId/add-access',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR, {
        addHouseToRequest: true,
    }),
    addAccessForSingleUserValidator,
    addAccessToHouseForSingleUser
);
router.post(
    '/:houseId/revoke-access',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    removeMultipleAccessesFromHouseValidator,
    removeMultipleUserAccessesFromHouse
);
router.delete(
    '/:houseId/revoke-access/:userId',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR),
    removeSingleUserAccessFromHouse
);
router.get(
    '/:houseId/users-for-access',
    houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR, {
        addHouseToRequest: true,
    }),
    getAvailableUsersForHouseAccess
);

router.get('/:houseSlug', getSingleHouseBySlug);
router.put('/:houseId', houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR), updateHouse);
router.delete('/:houseId', houseAccessMiddleware(HOUSE_ACCESS_TYPE.CREATOR), deleteHouse);

module.exports = router;
