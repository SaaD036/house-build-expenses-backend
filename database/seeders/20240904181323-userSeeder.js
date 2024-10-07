'use strict';

const bcrypt = require('bcrypt');

const { UserRole } = require('../../src/constants/roles');
const { UserAccountStatus } = require('../../src/constants/users');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPasswordSuper = await bcrypt.hash('Admin1234$#', 10);
        const hashedPasswordGuest = await bcrypt.hash('Guest1234$#', 10);

        await queryInterface.bulkInsert(
            'Users',
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
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
