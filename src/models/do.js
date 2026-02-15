'use strict';
const { Sequelize, Model } = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdBy'];

module.exports = (sequelize, DataTypes) => {
    class DO extends Model {
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
            modelName: 'DOs',
            tableName: 'dos',
        }
    );

    return DO;
};
