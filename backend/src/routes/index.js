const express = require('express');

const authRouter = require('./auth');
const houseRouter = require('./house');
const userRouter = require('./user');
const expenseRouter = require('./expense');
const doRouter = require('./do');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use('/auth', authRouter);

router.use(authMiddleware);

router.use('/house', houseRouter);
router.use('/user', userRouter);
router.use('/house/:houseId/expense', expenseRouter);
router.use('/house/:houseId/do', doRouter);

module.exports = router;
