const express = require('express');

const { getAllExpenses } = require('../../controllers/expense');

const router = express.Router();

router.get('/', getAllExpenses);

module.exports = router;
