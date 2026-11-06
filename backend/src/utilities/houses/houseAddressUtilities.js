const { isValidAddressStructure } = require('../database/addressColumn');

const HOUSE_ADDRESS_KEYS = ['address_line', 'area', 'upazilla', 'district'];

const isTwoAddressValueEqual = (value1, value2) => {
    return (value1 || '').trim().toLowerCase() === (value2 || '').trim().toLowerCase();
};

const isHouseAddressValidated = (value) => {
    try {
        isValidAddressStructure(value);
        return true;
    } catch (err) {
        return false;
    }
};

const compareHouseAddress = (address1, address2) => {
    return HOUSE_ADDRESS_KEYS.every((key) => isTwoAddressValueEqual(address1[key], address2[key]));
};

module.exports = { compareHouseAddress, isHouseAddressValidated };
