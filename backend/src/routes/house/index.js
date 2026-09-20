const express = require('express');

const { createHouse } = require('../../controllers/house');

const { createHouseValidator } = require('./houseValidators');

const router = express.Router();

router.post('/', createHouseValidator, createHouse);

module.exports = router;
