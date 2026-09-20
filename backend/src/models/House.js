const slugify = require('slugify');

const BaseSoftDeleteModel = require('./baseModels/BaseSoftDeleteModel');

const { isValidAddressStructure } = require('../utilities/database/addressColumn');

module.exports = (sequelize, DataTypes) => {
    class House extends BaseSoftDeleteModel {
        static associate({ User }) {
            House.belongsTo(User, {
                foreignKey: 'owner_id',
                as: 'owner',
            });
        }
    }

    House.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
                validate: {
                    notEmpty: {
                        msg: 'House name cannot be empty.',
                    },
                },
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                field: 'slug',
            },
            address: {
                type: DataTypes.JSONB,
                allowNull: false,
                field: 'address',
                validate: {
                    customValidator(value) {
                        isValidAddressStructure(value);
                    },
                },
            },
            floorCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                field: 'floor_count',
                validate: {
                    min: {
                        args: [1],
                        msg: 'Floor count must be greater than 0.',
                    },
                },
            },
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'owner_id',
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'is_approved',
            },
        },
        {
            sequelize,
            modelName: 'House',
            tableName: 'houses',
            hooks: {
                beforeValidate: (house) => {
                    if (house.name && !house.slug) {
                        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
                        const slugPart = `${slugify(house.name, { lower: true, strict: true })}`;

                        house.slug = `${slugPart}-${Date.now()}-${randomSuffix}`;
                    }
                },
            },
        }
    );

    return House;
};
