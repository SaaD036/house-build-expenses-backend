const isValidAddressStructure = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('Address must be a valid JSON object');
    }

    const allowedKeys = ['address_line', 'area', 'upazilla', 'district'];
    const keys = Object.keys(value);

    if (allowedKeys.length !== keys.length) {
        throw new Error('Address must be a valid JSON object');
    }

    const isKeyValid = allowedKeys.every((key) => key.includes(key));
    const isKeyValueValid = allowedKeys.every(
        (key) => typeof value[key] === 'string' && value[key].trim().length >= 1
    );

    if (!isKeyValid || !isKeyValueValid) {
        throw new Error('Address JSON can only contain: address_line, area, upazilla, district');
    }
};

module.exports = { isValidAddressStructure };
