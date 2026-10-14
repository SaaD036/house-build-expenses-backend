const { get } = require('lodash');

const { sequelize, Expense, DO } = require('../../models');

const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');
const { NotFoundError } = require('../../utilities/errors/ApiError');

const addOrRemoveDoToExpenseService = async (userId, houseId, doId, expenseIdxArray, toAdd) => {
    const transaction = await sequelize.transaction();

    const [expenses, theDo] = await Promise.all([
        Expense.scope({ method: ['houseScope', houseId] }).findAll({
            where: { id: expenseIdxArray },
            attributes: ['id', 'doId', 'expenseEditHistory'],
            transaction,
        }),
        DO.scope({ method: ['houseScope', houseId] }).findOne({
            where: { id: doId },
            attributes: ['id'],
        }),
    ]);

    if (!theDo) {
        await transaction.rollback();
        throw new NotFoundError(`No do found with the id = ${doId}`);
    }

    const committedExpenseSet = new Set();
    const payloadExpenseSet = new Set(expenseIdxArray);

    const updatePromises = (expenses || [])
        .filter((expense) => {
            const expenseToCommit = toAdd ? expense.doId != doId : expense.doId == doId;

            if (expenseToCommit) {
                committedExpenseSet.add(expense.id);
            }

            return expenseToCommit;
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

    return {
        committedExpenses: [...committedExpenseSet],
        ignoredExpenses: [...payloadExpenseSet.difference(committedExpenseSet)],
    };
};

const addDoToExpensesService = async (userId, houseId, doId, expenseIdxArray) => {
    const { committedExpenses = [], ignoredExpenses = [] } = await addOrRemoveDoToExpenseService(
        userId,
        houseId,
        doId,
        expenseIdxArray,
        true
    );

    return {
        addedExpenses: committedExpenses,
        ignoredExpenses,
    };
};

const removeDoFromExpensesService = async (userId, houseId, doId, expenseIdxArray) => {
    const { committedExpenses = [], ignoredExpenses = [] } = await addOrRemoveDoToExpenseService(
        userId,
        houseId,
        doId,
        expenseIdxArray,
        false
    );

    return {
        removedExpenses: committedExpenses,
        ignoredExpenses,
        ignoredExpensesCount: ignoredExpenses.length,
    };
};

const removeDoFromAllExpensesService = async (userId, doId) => {
    const transaction = await sequelize.transaction();

    const removedExpenses = [];
    const expenses = await Expense.findAll({
        where: { doId },
        attributes: ['id', 'doId', 'expenseEditHistory'],
        transaction,
    });

    const updatePromises = (expenses || []).map((expense) => {
        const updatedEditHistory = {
            last_updated_by: userId,
            history: [
                ...get(expense, 'expenseEditHistory.history', []),
                createExpenseEditHistoryItem('remove_do', 'do_id', userId, null, expense.doId),
            ],
        };

        removedExpenses.push(expense.id);

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

    return removedExpenses;
};

module.exports = {
    addDoToExpensesService,
    removeDoFromExpensesService,
    removeDoFromAllExpensesService,
};
