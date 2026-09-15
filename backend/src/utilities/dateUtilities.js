const hasTwoDateSameDay = (date1, date2) => {
    const date1Date = new Date(date1);
    const date2Date = new Date(date2);

    if (date1Date.getFullYear() !== date2Date.getFullYear()) {
        return false;
    }

    if (date1Date.getMonth() !== date2Date.getMonth()) {
        return false;
    }

    if (date1Date.getDay() !== date2Date.getDay()) {
        return false;
    }

    return true;
};

module.exports = { hasTwoDateSameDay };
