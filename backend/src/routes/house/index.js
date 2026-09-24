const express = require('express');

const {
    getAllHouses,
    createHouse,
    updateHouse,
    getSingleHouseBySlug,
} = require('../../controllers/house');

const houseAccessMiddleware = require('../../middlewares/HouseAccessMiddleware');

const { createHouseValidator } = require('./houseValidators');
const { HOUSE_ACCESS_TYPE } = require('../../constants/houses/houseAccess');

const router = express.Router();

router.get('/', getAllHouses);
router.post('/', createHouseValidator, createHouse);

router.get('/:houseSlug', getSingleHouseBySlug);
router.put('/:houseId', houseAccessMiddleware(HOUSE_ACCESS_TYPE.CONTRIBUTOR), updateHouse);

module.exports = router;
