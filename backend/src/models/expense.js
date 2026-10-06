'use strict';
const { Sequelize } = require('sequelize');

const BaseSoftDeleteModel = require('./baseModels/BaseSoftDeleteModel');

const PROTECTED_ATTRIBUTES = ['createdBy', 'doId', 'isDeleted'];

module.exports = (sequelize, DataTypes) => {
    class Expense extends BaseSoftDeleteModel {
        static associate({ User, House, DO }) {
            this.belongsTo(User, {
                foreignKey: 'createdBy',
                onDelete: 'CASCADE',
                as: 'creator',
            });

            this.belongsTo(User, {
                foreignKey: 'createdBy',
                as: 'lastUpdater',
                targetKey: 'id',
            });

            this.belongsTo(DO, {
                foreignKey: 'doId',
                onDelete: 'CASCADE',
                as: 'do',
            });

            this.belongsTo(House, {
                foreignKey: 'houseId',
                onDelete: 'CASCADE',
                as: 'house',
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
            houseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'House',
                    key: 'id',
                },
                field: 'house_id',
                onDelete: 'CASCADE',
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
            doId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'dos',
                    key: 'id',
                },
                field: 'do_id',
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
        },
        {
            sequelize,
            modelName: 'Expense',
            tableName: 'expenses',
        }
    );

    return Expense;
};
