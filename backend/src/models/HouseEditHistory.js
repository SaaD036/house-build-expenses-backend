const { DataTypes } = require('sequelize');

const BaseModel = require('./baseModels/BaseModel');

const { HOUSE_TABLES } = require('../constants/houses');

const HOUSE_TABLE_ARRAY = [HOUSE_TABLES.HOUSE, HOUSE_TABLES.HOUSE_ACCESS];

module.exports = (sequelize) => {
    class HouseEditHistory extends BaseModel {
        static associate({ House, User }) {
            HouseEditHistory.belongsTo(House, {
                foreignKey: 'houseId',
                as: 'house',
            });

            HouseEditHistory.belongsTo(User, {
                foreignKey: 'editBy',
                as: 'editor',
            });
        }
    }

    HouseEditHistory.init(
        {
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
            editBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'edit_by',
                references: {
                    model: 'users',
                    key: 'id',
                },
                validate: {
                    notNull: { msg: 'Editor User ID is required.' },
                },
            },
            editedTable: {
                type: DataTypes.ENUM(...HOUSE_TABLE_ARRAY),
                allowNull: false,
                field: 'edited_table',
                validate: {
                    isIn: {
                        args: [HOUSE_TABLE_ARRAY],
                        msg: `Table name must be one of: ${HOUSE_TABLE_ARRAY.join(', ')}`,
                    },
                },
            },
            editedColumn: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'edited_column',
                validate: {
                    notEmpty: { msg: 'Edited column name cannot be empty.' },
                },
            },
            value: {
                type: DataTypes.JSONB,
                allowNull: false,
                field: 'value',
            },
        },
        {
            sequelize,
            modelName: 'HouseEditHistory',
            tableName: HOUSE_TABLES.HOUSE_EDIT_HISTORY,
            updatedAt: false,
            indexes: [
                {
                    fields: ['house_id'],
                    name: 'idx_house_edit_history_house_id',
                },
                {
                    fields: ['edit_by'],
                    name: 'idx_house_edit_history_edit_by',
                },
            ],
        }
    );

    return HouseEditHistory;
};
