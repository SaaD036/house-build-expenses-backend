const { House } = require('../../models');

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
};

module.exports = { HOUSE_TABLE_COLUMN_NAMES };
