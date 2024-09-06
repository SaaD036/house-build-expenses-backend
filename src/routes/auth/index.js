const express = require('express');

const AuthMiddleware = require('../../middlewares/auth');
const AdminMiddleware = require('../../middlewares/auth/Admin');

const { loginValidator } = require('./authValidators');
const validtorHandler = require('../validatorHandler');

const { login } = require('../../controllers/auth');

const { HTTP_STATUS } = require('../../constants/http');

const router = express.Router();

router.get('/', AuthMiddleware, AdminMiddleware, (req, res, next) => {
    return res.json(req.user).status(HTTP_STATUS.OK);
});
router.post('/login', loginValidator, validtorHandler, login);

module.exports = router;
