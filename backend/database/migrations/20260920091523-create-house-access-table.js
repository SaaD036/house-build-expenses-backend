'use strict';

const { HOUSE_ACCESS_TYPE } = require('../../src/constants/houses/houseAccess');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('house_access', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            house_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'houses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            access_type: {
                type: DataTypes.ENUM(HOUSE_ACCESS_TYPE.VIEWER, HOUSE_ACCESS_TYPE.CONTRIBUTOR),
                allowNull: false,
            },
            access_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('house_access', ['user_id', 'house_id'], {
            unique: true,
            name: 'unique_user_house_access',
        });

        await queryInterface.addIndex('house_access', ['user_id'], {
            name: 'idx_house_access_user_id',
        });

        await queryInterface.addIndex('house_access', ['house_id'], {
            name: 'idx_house_access_house_id',
        });
    },

    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('house_access');
    },
};
