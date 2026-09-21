const { DataTypes } = require('sequelize');

const BaseModel = require('./baseModels/BaseModel');

const { HOUSE_ACCESS_TYPE } = require('../constants/houses/houseAccess');
const ACCESS_TYPES = [HOUSE_ACCESS_TYPE.CONTRIBUTOR, HOUSE_ACCESS_TYPE.VIEWER];

module.exports = (sequelize) => {
    class HouseAccess extends BaseModel {
        static associate({ User, House }) {
            HouseAccess.belongsTo(User, {
                foreignKey: 'userId',
                as: 'user',
            });

            HouseAccess.belongsTo(House, {
                foreignKey: 'houseId',
                as: 'house',
            });
        }
    }

    HouseAccess.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id',
                },
                validate: {
                    notNull: { msg: 'User ID is required.' },
                },
            },
            houseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'house_id',
                references: {
                    model: 'houses',
                    key: 'id',
                },
                validate: {
                    notNull: { msg: 'House ID is required.' },
                },
            },
            accessType: {
                type: DataTypes.ENUM(...ACCESS_TYPES),
                allowNull: false,
                field: 'access_type',
                validate: {
                    isIn: {
                        args: [ACCESS_TYPES],
                        msg: `Access type must be one of: ${ACCESS_TYPES.join(', ')}`,
                    },
                },
            },
            accessBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'access_by',
                references: {
                    model: 'users',
                    key: 'id',
                },
                validate: {
                    notNull: { msg: 'User ID is required.' },
                },
            },
        },
        {
            sequelize,
            modelName: 'HouseAccess',
            tableName: 'house_access',
            indexes: [
                {
                    unique: true,
                    fields: ['user_id', 'house_id'],
                    name: 'unique_user_house_access',
                },
                {
                    fields: ['user_id'],
                    name: 'idx_house_access_user_id',
                },
                {
                    fields: ['house_id'],
                    name: 'idx_house_access_house_id',
                },
            ],
        }
    );

    return HouseAccess;
};
