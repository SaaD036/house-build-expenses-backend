const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');
const expenseRouter = require('./expense');
const doRouter = require('./do');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter);
router.use('/expense', authMiddleware, expenseRouter);
router.use('/do', authMiddleware, doRouter);

module.exports = router;
