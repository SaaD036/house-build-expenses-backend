'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.addColumn('dos', 'deleted_at', {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        });
    },

    async down(queryInterface, DataTypes) {
        await queryInterface.removeColumn('dos', 'deleted_at');
    },
};
