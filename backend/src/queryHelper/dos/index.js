const { Op } = require('sequelize');

const { preparePaginationQuery } = require('..');

const { EXPENSE_START_DATE } = require('../../constants/expense');

const prepareFiltersForAllDos = (params) => {
    const filter = { ...preparePaginationQuery(params) };
    let where = { isDeleted: false };

    if (params.shopName) {
        where = {
            ...where,
            shop_name: {
                [Op.iLike]: params.shopName,
            },
        };
    }

    if (params.doItem) {
        where = {
            ...where,
            do_item: {
                [Op.iLike]: `%${params.doItem}%`,
            },
        };
    }

    if (params.fromDate || params.toDate) {
        const updatedStartDate = (params.fromDate || '').split('T')[0]
            ? new Date((params.fromDate || '').split('T')[0])
            : EXPENSE_START_DATE;
        const updatedEndDate = (params.toDate || '').split('T')[0]
            ? new Date(`${(params.toDate || '').split('T')[0]}T23:59:59.000Z`)
            : new Date();

        where = {
            ...where,
            do_date: {
                [Op.between]: [updatedStartDate, updatedEndDate],
            },
        };
    }

    if (!isNaN(Number(params.createdBy))) {
        where = {
            ...where,
            created_by: {
                [Op.eq]: Number(params.createdBy),
            },
        };
    }

    return {
        ...filter,
        where,
    };
};

module.exports = {
    prepareFiltersForAllDos,
};
