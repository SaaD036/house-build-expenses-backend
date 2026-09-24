const prepareValueColumnDataForHouseEdit = (newValue, oldValue, rowId) => {
    let value = {};

    if (newValue) {
        value = { ...value, newValue };
    }

    if (oldValue) {
        value = { ...value, oldValue };
    }

    if (rowId) {
        value = { ...value, row: rowId };
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
