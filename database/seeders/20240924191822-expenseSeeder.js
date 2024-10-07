'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'expenses',
            [
                {
                    amount: 100,
                    title: 'Transport cost',
                    description: 'Went to the fucker advocate.',
                    created_by: 1,
                },
                {
                    amount: 10000000,
                    title: 'Rod: BSRM',
                    description: 'Bought rod for base.',
                    created_by: 1,
                },
                {
                    amount: 180000,
                    title: 'Cement: Holcim',
                    description: 'Bought cement for base.',
                    created_by: 1,
                },
                {
                    amount: 20000,
                    title: 'Guard room construction',
                    description: 'Construction cost for guard room infront of the house.',
                    created_by: 1,
                },
                {
                    amount: 50000,
                    title: 'Bricks: Picket',
                    description: 'Bought bricks for base.',
                    created_by: 1,
                },
                {
                    amount: 5000,
                    title: 'Hardware',
                    description: 'Bought hardware like pin, hammers etc.',
                    created_by: 1,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('expenses', null, {});
    },
};
