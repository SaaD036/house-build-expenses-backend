'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.addColumn(
                'houses',
                'description',
                {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                { transaction }
            );

            await queryInterface.addColumn(
                'houses',
                'image_url',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.removeColumn('houses', 'image_url', { transaction });
            await queryInterface.removeColumn('houses', 'description', { transaction });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
};
