'use strict';

const bcrypt = require('bcrypt');

const { seedIfTableIsEmpty } = require('../../src/utilities/database/seederHelper');

const { UserRole } = require('../../src/constants/roles');
const { UserAccountStatus } = require('../../src/constants/users');

module.exports = {
    async up(queryInterface, Sequelize) {
        await seedIfTableIsEmpty(queryInterface, 'users', async () => {
            const hashedPasswordSuper = await bcrypt.hash('Admin1234$#', 10);
            const hashedPasswordGuest = await bcrypt.hash('Guest1234$#', 10);

            await queryInterface.bulkInsert(
                'users',
                [
                    {
                        first_name: 'Super',
                        last_name: 'User',
                        email: 'admin@m-house.com',
                        password: hashedPasswordSuper,
                        role: UserRole.ADMIN,
                        account_status: UserAccountStatus.ACTIVE,
                    },
                    {
                        first_name: 'Guest',
                        last_name: 'User',
                        email: 'guest.user@m-house.com',
                        password: hashedPasswordGuest,
                        role: UserRole.USER,
                        account_status: UserAccountStatus.ACTIVE,
                    },
                ],
                {
                    returning: true,
                    ignoreDuplicates: true,
                    exception: Sequelize.literal('ON CONFLICT (email) DO NOTHING'),
                }
            );
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'users',
            {
                email: ['admin@m-house.com', 'guest.user@m-house.com'],
            },
            {}
        );
    },
};
