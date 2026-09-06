const express = require('express');

const adminMiddleware = require('../../middlewares/auth/Admin');

const {
    getAllUser,
    createUser,
    getSingleUser,
    getLoggedInUser,
} = require('../../controllers/user');

const { createUserValidator } = require('./userValidators');
const validtorHandler = require('../validatorHandler');

const router = express.Router();

router.get('/', adminMiddleware, getAllUser);
router.post('/', adminMiddleware, createUserValidator, validtorHandler, createUser);
router.get('/logged-in-user', getLoggedInUser);
router.get('/:userId', getSingleUser);

module.exports = router;
