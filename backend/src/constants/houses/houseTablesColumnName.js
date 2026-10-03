const { House, HouseAccess } = require('../../models');

const HOUSE_TABLE_COLUMN_NAMES = {
    name: {
        modelKey: 'name',
        dbKey: House.rawAttributes.name.field,
    },
    address: {
        modelKey: 'address',
        dbKey: House.rawAttributes.address.field,
    },
    floorCount: {
        modelKey: 'floorCount',
        dbKey: House.rawAttributes.floorCount.field,
    },
    isDeleted: {
        modelKey: 'isDeleted',
        dbKey: House.rawAttributes.isDeleted.field,
    },
};

const HOUSE_ACCESS_TABLE_COLUMN_NAMES = {
    newRow: {
        modelKey: 'newRow',
        dbKey: 'newRow',
    },
    removeRow: {
        modelKey: 'removeRow',
        dbKey: 'removeRow',
    },
    userId: {
        modelKey: 'userId',
        dbKey: HouseAccess.rawAttributes.userId.field,
    },
    houseId: {
        modelKey: 'houseId',
        dbKey: HouseAccess.rawAttributes.houseId.field,
    },
    accessType: {
        modelKey: 'accessType',
        dbKey: HouseAccess.rawAttributes.accessType.field,
    },
    accessBy: {
        modelKey: 'accessBy',
        dbKey: HouseAccess.rawAttributes.accessBy.field,
    },
};

module.exports = { HOUSE_TABLE_COLUMN_NAMES, HOUSE_ACCESS_TABLE_COLUMN_NAMES };
