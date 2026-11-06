'use strict';
const { Sequelize } = require('sequelize');

const BaseSoftDeleteModel = require('./baseModels/BaseSoftDeleteModel');

const PROTECTED_ATTRIBUTES = ['createdBy', 'isDeleted', 'deletedAt'];

module.exports = (sequelize, DataTypes) => {
    class DO extends BaseSoftDeleteModel {
        static associate({ User, House, Expense }) {
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

            this.belongsTo(House, {
                foreignKey: 'houseId',
                onDelete: 'CASCADE',
                as: 'house',
            });

            this.hasMany(Expense, {
                foreignKey: 'doId',
                as: 'expenses',
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

    DO.init(
        {
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
                defaultValue: Sequelize.fn('NOW'),
                field: 'do_date',
            },
            doEditHistory: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'do_edit_history',
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
            imageURL: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                },
                field: 'image_url',
            },
        },
        {
            sequelize,
            modelName: 'DO',
            tableName: 'dos',
            scopes: {
                houseScope(houseId) {
                    return {
                        where: { houseId },
                    };
                },
            },
        }
    );

    return DO;
};
