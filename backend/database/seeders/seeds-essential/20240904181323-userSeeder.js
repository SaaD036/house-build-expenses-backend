'use strict';

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const { UserRole } = require('../../../src/constants/roles');
const { UserAccountStatus } = require('../../../src/constants/users');

dotenv.config();

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPasswordSuper = await bcrypt.hash(process.env.DB_SEED_PASSWORD, 10);
        const hashedPasswordGuest = await bcrypt.hash(process.env.DB_SEED_PASSWORD, 10);
        const users = [
            {
                first_name: 'Super',
                last_name: 'User',
                email: process.env.DB_SEED_SUPER_ADMIN_EMAIL,
                password: hashedPasswordSuper,
                role: UserRole.ADMIN,
                account_status: UserAccountStatus.ACTIVE,
            },
            {
                first_name: 'Guest Super',
                last_name: 'User',
                email: process.env.DB_SEED_GUEST_ADMIN_EMAIL,
                password: hashedPasswordGuest,
                role: UserRole.VISITOR,
                account_status: UserAccountStatus.ACTIVE,
            },
        ];

        for (const user of users) {
            const existing = await queryInterface.rawSelect(
                'users',
                {
                    where: { email: user.email },
                },
                ['id']
            );

            if (!existing) {
                await queryInterface.bulkInsert('users', [user]);
            } else {
                console.log(
                    `ℹ️ User with email = "${user.email}" already exists. Skipping user creation.`
                );
            }
        }
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
