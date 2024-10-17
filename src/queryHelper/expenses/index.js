const { Op } = require('sequelize');

const { preparePaginationQuery } = require('..');

const { EXPENSE_START_DATE } = require('../../constants/expense');

const prepareFiltersForAllExpenses = (params) => {
    const filter = {
        ...preparePaginationQuery(params),
    };
    let where = {};

    if (params.title) {
        where = {
            ...where,
            title: {
                [Op.iLike]: params.title,
            },
        };
    }

    if (params.description) {
        where = {
            ...where,
            description: {
                [Op.iLike]: `%${params.description}%`,
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
            expense_at: {
                [Op.between]: [updatedStartDate, updatedEndDate],
            },
        };
    }

    if (params.created_by) {
        where = {
            ...where,
            created_by: {
                [Op.eq]: Number(params.created_by),
            },
        };
    }

    return {
        ...filter,
        where,
    };
};

module.exports = {
    prepareFiltersForAllExpenses,
};
