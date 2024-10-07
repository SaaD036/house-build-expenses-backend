'use strict';

const { UserRole } = require('../../src/constants/roles');
const { UserAccountStatus } = require('../../src/constants/users');

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
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
                defaultValue: DataTypes.fn('NOW'),
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.fn('NOW'),
                field: 'updated_at',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
