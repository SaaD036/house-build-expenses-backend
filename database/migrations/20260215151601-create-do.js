'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('dos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            shopName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'shop_name',
            },
            shopAddress: {
                type: DataTypes.JSON,
                allowNull: false,
                field: 'shop_address',
            },
            doItem: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'do_item',
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description',
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'amount',
                validate: {
                    min: 1,
                },
            },
            doDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('NOW'),
                field: 'do_date',
            },
            doEditHistory: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'do_edit_history',
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'created_by',
                onDelete: 'CASCADE',
            },
            imageURL: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                },
                field: 'image_url',
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: 'is_deleted',
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.fn('NOW'),
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.fn('NOW'),
                field: 'updated_at',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('dos');
    },
};
