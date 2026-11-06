'use strict';

const { backfillHouseIdInExpenseAndDoTable } = require('./helpers/houseMigrationHelper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const tables = ['dos', 'expenses'];

            for (const table of tables) {
                await queryInterface.addColumn(
                    table,
                    'house_id',
                    {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                    },
                    { transaction }
                );

                await backfillHouseIdInExpenseAndDoTable(queryInterface, table, transaction);

                await queryInterface.changeColumn(
                    table,
                    'house_id',
                    {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'houses',
                            key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    { transaction }
                );

                await queryInterface.addIndex(table, ['house_id'], {
                    name: `idx_${table}_house_id`,
                    transaction,
                });
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const tables = ['dos', 'expenses'];

            for (const table of tables) {
                await queryInterface.removeIndex(table, `idx_${table}_house_id`, { transaction });
                await queryInterface.removeColumn(table, 'house_id', { transaction });
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
};
