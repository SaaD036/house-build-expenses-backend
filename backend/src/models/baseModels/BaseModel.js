const { Model, DataTypes } = require('sequelize');

class BaseModel extends Model {
    static init(attributes, options = {}) {
        const hasUpdatedAt = options.updatedAt !== false;

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
        };

        if (hasUpdatedAt) {
            baseAttributes.updatedAt = {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'updated_at',
            };
        }

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
            ...baseAttributes,
            ...attributes,
        };

        return super.init(mergedAttributes, mergedOptions);
    }
}

module.exports = BaseModel;
