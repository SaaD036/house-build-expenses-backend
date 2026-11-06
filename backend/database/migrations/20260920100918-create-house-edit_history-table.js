'use strict';

const { HOUSE_TABLES } = require('../../src/constants/houses');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable(HOUSE_TABLES.HOUSE_EDIT_HISTORY, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
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
            edit_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            edited_table: {
                type: DataTypes.ENUM(HOUSE_TABLES.HOUSE, HOUSE_TABLES.HOUSE_ACCESS),
                allowNull: false,
            },
            edited_column: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex(HOUSE_TABLES.HOUSE_EDIT_HISTORY, ['house_id'], {
            name: 'idx_house_edit_history_house_id',
        });

        await queryInterface.addIndex(HOUSE_TABLES.HOUSE_EDIT_HISTORY, ['edit_by'], {
            name: 'idx_house_edit_history_edit_by',
        });
    },

    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable(HOUSE_TABLES.HOUSE_EDIT_HISTORY);
    },
};
