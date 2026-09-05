const { get } = require('lodash');

const { sequelize, Expenses, DOs } = require('../../models');

const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');
const { NotFoundError } = require('../../utilities/errors/ApiError');

const addDoToExpensesService = async (userId, doId, expenseIdxArray) => {
    const transaction = await sequelize.transaction();

    const [expenses, theDo] = await Promise.all([
        Expenses.findAll({
            where: { id: expenseIdxArray },
            transaction,
        }),
        DOs.findOne({ where: { id: doId } }),
    ]);

    if (!expenses.length) {
        await transaction.rollback();
        throw new NotFoundError('not expense found with the idx');
    }

    if (!theDo) {
        await transaction.rollback();
        throw new NotFoundError(`not do found with the id = ${doId}`);
    }

    const updatePromises = expenses
        .filter((expense) => expense.doId != doId)
        .map((expense) => {
            const updatedEditHistory = {
                last_updated_by: userId,
                history: [
                    ...get(expense, 'expenseEditHistory.history', []),
                    createExpenseEditHistoryItem(
                        'add_update_do',
                        'do_id',
                        userId,
                        doId,
                        expense.doId
                    ),
                ],
            };

            return expense.update(
                {
                    doId,
                    expenseEditHistory: updatedEditHistory,
                },
                { transaction }
            );
        });

    await Promise.all(updatePromises);
    await transaction.commit();
};

module.exports = {
    addDoToExpensesService,
};
