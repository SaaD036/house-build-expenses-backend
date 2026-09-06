const { get } = require('lodash');

const { Expenses, DOs } = require('../../models');

const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');

const { NotFoundError } = require('../../utilities/errors/ApiError');

const addSingleExpenseInTheDoService = async (userId, expenseId, doId) => {
    const [expense, theDo] = await Promise.all([
        Expenses.findOne({ where: { id: expenseId } }),
        DOs.findOne({ where: { id: doId } }),
    ]);

    if (!expense) {
        throw new NotFoundError(`expense with id=${expenseId} not found`);
    }

    if (!theDo) {
        throw new NotFoundError(`do with id=${doId} not found`);
    }

    const existingCombination = await Expenses.findOne({ where: { id: expenseId, doId } });

    if (existingCombination) {
        return;
    }

    const newEditHistory = [];
    newEditHistory.push(
        createExpenseEditHistoryItem('add_update_do', 'do_id', userId, doId, expense.doId)
    );

    expense.doId = doId;
    expense.expenseEditHistory = {
        last_updated_by: userId,
        history: [...get(expense, 'expenseEditHistory.history', []), ...newEditHistory],
    };

    await expense.save();
};

module.exports = {
    addSingleExpenseInTheDoService,
};
