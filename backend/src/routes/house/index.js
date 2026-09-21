const express = require('express');

const { getAllHouses, createHouse, getSingleHouseBySlug } = require('../../controllers/house');

const { createHouseValidator } = require('./houseValidators');

const router = express.Router();

router.get('/', getAllHouses);
router.post('/', createHouseValidator, createHouse);

router.get('/:houseSlug', getSingleHouseBySlug);

module.exports = router;
