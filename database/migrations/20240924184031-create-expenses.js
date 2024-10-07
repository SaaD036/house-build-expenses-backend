'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('expenses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'amount',
                validate: {
                    min: 1,
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'title',
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description',
            },
            expenseEditHistory: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'expense_edit_history',
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                field: 'created_by',
                onDelete: 'CASCADE',
            },
            expenseAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('NOW'),
                field: 'expense_at',
            },
            attachmentURL: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                },
                field: 'attachment_url',
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
        await queryInterface.dropTable('expenses');
    },
};
