const { Expenses } = require('../../models');

const { HTTP_STATUS } = require('../../constants/http');

const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expenses.findAll({
            include: {
                association: 'creator',
                attributes: ['id', 'firstName', 'lastName'],
            },
        });

        return res.status(HTTP_STATUS.OK).json({
            expenses,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllExpenses,
};
