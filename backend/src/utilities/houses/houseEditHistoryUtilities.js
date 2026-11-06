const prepareValueColumnDataForHouseEdit = (newValue, oldValue, otherValue = {}) => {
    let value = { ...otherValue };

    if (newValue) {
        value = { ...value, newValue };
    }

    if (oldValue) {
        value = { ...value, oldValue };
    }

    return value;
};

const prepareDataForHouseEditTableRow = (houseId, editBy, editedTable, editedColumn, value) => {
    return { houseId, editBy, editedTable, editedColumn, value };
};

module.exports = {
    prepareDataForHouseEditTableRow,
    prepareValueColumnDataForHouseEdit,
};
