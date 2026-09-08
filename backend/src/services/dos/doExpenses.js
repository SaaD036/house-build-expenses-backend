const { get } = require('lodash');

const { sequelize, Expense, DO } = require('../../models');

const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');
const { NotFoundError } = require('../../utilities/errors/ApiError');

const addRemoveDoToExpenseService = async (userId, doId, expenseIdxArray, toAdd) => {
    const transaction = await sequelize.transaction();

    const [expenses, theDo] = await Promise.all([
        Expense.findAll({
            where: { id: expenseIdxArray },
            transaction,
        }),
        DO.findOne({ where: { id: doId } }),
    ]);

    if (!expenses.length) {
        await transaction.rollback();
        throw new NotFoundError('no expense found with the idx');
    }

    if (!theDo) {
        await transaction.rollback();
        throw new NotFoundError(`no do found with the id = ${doId}`);
    }

    const updatePromises = expenses
        .filter((expense) => {
            return toAdd ? expense.doId != doId : expense.doId == doId;
        })
        .map((expense) => {
            const updatedEditHistory = {
                last_updated_by: userId,
                history: [
                    ...get(expense, 'expenseEditHistory.history', []),
                    createExpenseEditHistoryItem(
                        toAdd ? 'add_update_do' : 'remove_do',
                        'do_id',
                        userId,
                        toAdd ? doId : null,
                        expense.doId
                    ),
                ],
            };

            return expense.update(
                {
                    doId: toAdd ? doId : null,
                    expenseEditHistory: updatedEditHistory,
                },
                { transaction }
            );
        });

    await Promise.all(updatePromises);
    await transaction.commit();
};

const addDoToExpensesService = async (userId, doId, expenseIdxArray) => {
    await addRemoveDoToExpenseService(userId, doId, expenseIdxArray, true);
};

const removeDoFromExpensesService = async (userId, doId, expenseIdxArray) => {
    await addRemoveDoToExpenseService(userId, doId, expenseIdxArray, false);
};

const removeDoFromAllExpensesService = async (userId, doId) => {
    const transaction = await sequelize.transaction();

    const expenses = await Expense.findAll({
        where: { doId },
        transaction,
    });

    if (!expenses.length) {
        await transaction.rollback();
        throw new NotFoundError(`no expense found with do = ${doId}`);
    }

    const updatePromises = expenses.map((expense) => {
        const updatedEditHistory = {
            last_updated_by: userId,
            history: [
                ...get(expense, 'expenseEditHistory.history', []),
                createExpenseEditHistoryItem('remove_do', 'do_id', userId, null, expense.doId),
            ],
        };

        return expense.update(
            {
                doId: null,
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
    removeDoFromExpensesService,
    removeDoFromAllExpensesService,
};
