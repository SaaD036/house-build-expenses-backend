'use strict';

const { seedIfTableIsEmpty } = require('../../../src/utilities/database/seederHelper');

const { UserAccountStatus } = require('../../../src/constants/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await seedIfTableIsEmpty(queryInterface, 'houses', async () => {
            const existingUsers = await queryInterface.select(null, 'users', {
                attributes: ['id'],
                where: { account_status: UserAccountStatus.ACTIVE },
                order: [['id', 'ASC']],
            });

            if (existingUsers.length === 0) {
                return;
            }

            const targetedUserId = existingUsers[0].id;

            await queryInterface.bulkInsert(
                'houses',
                [
                    {
                        name: 'Sardarpara Housing',
                        slug: 'sardarpara-housing-',
                        address: JSON.stringify({
                            area: 'Sardarpara',
                            district: 'Jamalpur',
                            upazilla: 'Sadar',
                            address_line: 'Ward: 04, Holding: 1234/05',
                        }),
                        owner_id: targetedUserId,
                        is_approved: true,
                        is_deleted: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        deleted_at: null,
                    },
                    {
                        name: 'Mukundabari Housing',
                        slug: 'mukundabari-housing-',
                        address: JSON.stringify({
                            area: 'Mukundabari',
                            district: 'Jamalpur',
                            upazilla: 'Sadar',
                            address_line: 'Ward: 12, Holding: 8916/19',
                        }),
                        owner_id: targetedUserId,
                        is_approved: true,
                        is_deleted: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        deleted_at: null,
                    },
                ],
                {}
            );
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('houses', null, {});
    },
};
