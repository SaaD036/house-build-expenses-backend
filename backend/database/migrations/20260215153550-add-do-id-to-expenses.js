'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('expenses', 'do_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'dos',
                key: 'id',
            },
            field: 'do_id',
            onDelete: 'CASCADE',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('expenses', 'doId');
    },
};
