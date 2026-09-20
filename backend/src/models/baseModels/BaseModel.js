const { Model, DataTypes } = require('sequelize');

class BaseModel extends Model {
    static init(attributes, options = {}) {
        const baseAttributes = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'updated_at',
            },
        };

        const baseOptions = {
            timestamps: true,
            paranoid: false,
            underscored: true,
        };

        const mergedHooks = {
            ...(baseOptions.hooks || {}),
            ...(options.hooks || {}),
        };

        const mergedOptions = {
            ...baseOptions,
            ...options,
            hooks: mergedHooks,
        };

        const mergedAttributes = {
            ...attributes,
            ...baseAttributes,
        };

        return super.init(mergedAttributes, mergedOptions);
    }
}

module.exports = BaseModel;
