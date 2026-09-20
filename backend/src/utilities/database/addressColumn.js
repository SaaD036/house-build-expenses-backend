const isValidAddressStructure = (value) => {
    if (!value) {
        throw new Error('Address must be a valid JSON object');
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        const allowedKeys = ['address_line', 'area', 'upazilla', 'district'];
        const keys = Object.keys(value);

        const isValid = keys.every((key) => allowedKeys.includes(key));
        if (!isValid) {
            throw new Error(
                'Address JSON can only contain: address_line, area, upazilla, district'
            );
        }
    } else {
        throw new Error('Address must be a valid JSON object');
    }
};

module.exports = { isValidAddressStructure };
