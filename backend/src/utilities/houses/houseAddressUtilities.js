const { isValidAddressStructure } = require('../database/addressColumn');

const isHouseAddressValidated = (value) => {
    try {
        isValidAddressStructure(value);
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = { isHouseAddressValidated };
