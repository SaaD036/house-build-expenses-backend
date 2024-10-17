const { Expenses } = require('../../models');

const { prepareFiltersForAllExpenses } = require('../../queryHelper/expenses');

const { HTTP_STATUS } = require('../../constants/http');

const getAllExpenses = async (req, res, next) => {
    try {
        const { page, limit, title, description, fromDate, toDate } = req.query;
        const filter = prepareFiltersForAllExpenses({
            page,
            limit,
            title,
            description,
            fromDate,
            toDate,
        });

        const [expenses, expensesCount] = await Promise.all([
            Expenses.findAll({
                include: {
                    association: 'creator',
                    attributes: ['id', 'firstName', 'lastName'],
                },
                where: filter.where,
                limit: filter.limit,
                offset: filter.offset,
            }),
            Expenses.count({
                where: filter.where,
            }),
        ]);

        return res.status(HTTP_STATUS.OK).json({
            expenses,
            expensesCount,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllExpenses,
};
