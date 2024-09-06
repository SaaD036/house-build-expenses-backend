
'use strict';
const { Sequelize, Model } = require('sequelize');

const { UserRole } = require('../constants/roles');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
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
                isIn: [UserRole.ADMIN,  UserRole.USER, UserRole.VISITOR],
            },
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
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    });

    return User;
};
