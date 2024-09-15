'use strict';
const { Sequelize, Model } = require('sequelize');

const { UserRole } = require('../constants/roles');
const { UserAccountStatus } = require('../constants/users');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'first_name',
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'last_name',
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: UserRole.USER,
                validate: {
                    isIn: [UserRole.ADMIN, UserRole.USER, UserRole.VISITOR],
                },
            },
            accountStatus: {
                type: DataTypes.STRING,
                defaultValue: UserAccountStatus.WAITING_FOR_USER_APPROVAL,
                allowNull: false,
                validate: {
                    isIn: [
                        UserAccountStatus.ACTIVE,
                        UserAccountStatus.DEACTIVE,
                        UserAccountStatus.DELETED,
                        UserAccountStatus.WAITING_FOR_USER_APPROVAL,
                    ],
                },
                field: 'account_status',
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'reset_password_token',
            },
            accountEditHistory: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'account_edit_history',
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW'),
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW'),
                field: 'updated_at',
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );

    return User;
};
