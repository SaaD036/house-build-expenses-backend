const express = require('express');

const { getAllHouses, createHouse } = require('../../controllers/house');

const { createHouseValidator } = require('./houseValidators');

const router = express.Router();

router.get('/', getAllHouses);
router.post('/', createHouseValidator, createHouse);

module.exports = router;
