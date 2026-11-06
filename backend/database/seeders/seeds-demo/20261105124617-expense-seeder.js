'use strict';

const { seedIfTableIsEmpty } = require('../../../src/utilities/database/seederHelper');

module.exports = {
    async up(queryInterface, Sequelize) {
        await seedIfTableIsEmpty(queryInterface, 'expenses', async () => {
            const existingHouses = await queryInterface.select(null, 'houses', {
                attributes: ['id', 'owner_id'],
                where: { deleted_at: null },
                order: [['id', 'ASC']],
            });

            if (existingHouses.length === 0) {
                return;
            }

            const targetedHouseId = existingHouses[0].id;
            const targetedUserId = existingHouses[0].owner_id;

            await queryInterface.bulkInsert(
                'expenses',
                [
                    {
                        amount: 100,
                        title: 'Transport cost',
                        description: 'Went to the fucker advocate.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                    {
                        amount: 10000000,
                        title: 'Rod: BSRM',
                        description: 'Bought rod for base.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                    {
                        amount: 180000,
                        title: 'Cement: Holcim',
                        description: 'Bought cement for base.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                    {
                        amount: 20000,
                        title: 'Guard room construction',
                        description: 'Construction cost for guard room infront of the house.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                    {
                        amount: 50000,
                        title: 'Bricks: Picket',
                        description: 'Bought bricks for base.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                    {
                        amount: 5000,
                        title: 'Hardware',
                        description: 'Bought hardware like pin, hammers etc.',
                        created_by: targetedUserId,
                        house_id: targetedHouseId,
                    },
                ],
                {}
            );
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('expenses', null, {});
    },
};
