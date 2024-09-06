'use strict';

const bcrypt = require('bcrypt');

const { UserRole } = require('../../src/constants/roles');

module.exports = {
    async up (queryInterface, Sequelize) {
        const hashedPasswordSuper = await bcrypt.hash('Super87987##', 10);
        const hashedPasswordGuest = await bcrypt.hash('Guest87987##', 10);

        await queryInterface.bulkInsert('users', [
            {
                first_name: 'Super',
                last_name: 'User',
                email: 'admin@m-house.com',
                password: hashedPasswordSuper,
                role: UserRole.ADMIN,
            },
            {
                first_name: 'Guest',
                last_name: 'User',
                email: 'guest.user@m-house.com',
                password: hashedPasswordGuest,
                role: UserRole.USER,
            },
        ],
        {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
