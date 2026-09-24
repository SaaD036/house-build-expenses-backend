const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

class BaseSoftDeleteModel extends BaseModel {
    static init(attributes, options = {}) {
        const softDeleteAttributes = {
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
                field: 'is_deleted',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
                field: 'deleted_at',
            },
        };

        const softDeleteOptions = {
            paranoid: true,
            defaultScope: {
                where: {
                    isDeleted: false,
                },
            },
            hooks: {
                beforeDestroy: (instance) => {
                    instance.isDeleted = true;
                },
                beforeRestore: (instance) => {
                    instance.isDeleted = false;
                },
            },
        };

        const childDefaultScope = options.defaultScope || {};
        const childWhere = childDefaultScope.where || {};

        const mergedDefaultScope = {
            ...childDefaultScope,
            where: {
                ...softDeleteOptions.defaultScope.where,
                ...childWhere,
            },
        };

        const mergedHooks = {
            ...softDeleteOptions.hooks,
            ...(options.hooks || {}),
        };

        const mergedOptions = {
            ...softDeleteOptions,
            ...options,
            defaultScope: mergedDefaultScope,
            hooks: mergedHooks,
        };

        const mergedAttributes = {
            ...attributes,
            ...softDeleteAttributes,
        };

        return super.init(mergedAttributes, mergedOptions);
    }
}

module.exports = BaseSoftDeleteModel;
