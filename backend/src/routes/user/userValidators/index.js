const { check } = require('express-validator');

const { User } = require('../../../models');

const { UserRole } = require('../../../constants/roles');
const { UserAccountStatus } = require('../../../constants/users');

const createUserValidator = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('Email is invalid')
        .custom(async (value) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: value,
                    },
                    raw: true,
                });

                if (user) {
                    return Promise.reject();
                }
            } catch (error) {
                return Promise.reject();
            }
        })
        .withMessage('User exists with the email'),
    check('firstName').trim().isLength({ min: 1 }).withMessage('First name is empty'),
    check('lastName').trim().isLength({ min: 1 }).withMessage('Last name is empty'),
    check('role')
        .trim()
        .isIn([UserRole.ADMIN, UserRole.USER, UserRole.VISITOR])
        .withMessage('Role is invalid'),
    check('accountStatus')
        .trim()
        .isIn([
            UserAccountStatus.ACTIVE,
            UserAccountStatus.DEACTIVE,
            UserAccountStatus.DELETED,
            UserAccountStatus.WAITING_FOR_USER_APPROVAL,
        ])
        .withMessage('Account status is invalid'),
];

module.exports = { createUserValidator };
