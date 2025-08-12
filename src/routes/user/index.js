const express = require('express');

const adminMiddleware = require('../../middlewares/auth/Admin');

const { getAllUser } = require('../../controllers/user');

const router = express.Router();

router.get('/', adminMiddleware, getAllUser);

module.exports = router;
