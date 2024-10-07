'use strict';
const { Sequelize, Model } = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdByj'];

module.exports = (sequelize, DataTypes) => {
    class Expense extends Model {
        static associate({ User }) {
            this.belongsTo(User, {
                foreignKey: 'createdBy',
                onDelete: 'CASCADE',
                as: 'creator',
            });
        }

        toJSON() {
            let attributes = Object.assign({}, this.get());

            for (let a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }

            return attributes;
        }
    }

    Expense.init(
        {
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
                    model: 'users',
                    key: 'id',
                },
                field: 'created_by',
                onDelete: 'CASCADE',
            },
            expenseAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
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
                defaultValue: Sequelize.fn('NOW'),
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW'),
                field: 'updated_at',
            },
        },
        {
            sequelize,
            modelName: 'Expenses',
            tableName: 'expenses',
        }
    );

    return Expense;
};
