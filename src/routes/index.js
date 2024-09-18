const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter);

module.exports = router;
