/* eslint-disable max-len */
const { get } = require('lodash');

const { sequelize, User, Expense, DO } = require('../../models');

const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');

const { UserRole } = require('../../constants/roles');
const { NotFoundError } = require('../../utilities/errors/ApiError');

const addSingleExpenseInTheDoService = async (userId, expenseId, doId) => {
    const [expense, theDo] = await Promise.all([
        Expense.findOne({ where: { id: expenseId } }),
        DO.findOne({ where: { id: doId } }),
    ]);

    if (!expense) {
        throw new NotFoundError(`expense with id=${expenseId} not found`);
    }

    if (!theDo) {
        throw new NotFoundError(`do with id=${doId} not found`);
    }

    const existingCombination = await Expense.findOne({ where: { id: expenseId, doId } });

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

const getSingleExpenseService = async (expenseId, loggedInUser) => {
    const expense = await Expense.findOne({
        where: { id: expenseId, isDeleted: false },
        include: [
            {
                association: 'creator',
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                association: 'do',
                attributes: ['id', 'shopName', 'amount', 'doDate'],
            },
            {
                model: User,
                as: 'lastUpdater',
                on: sequelize.literal(
                    '"lastUpdater"."id" = CAST(NULLIF("Expense"."expense_edit_history"->>\'last_updated_by\', \'\') AS INTEGER)'
                ),
                required: false,
                attributes: ['id', 'firstName', 'lastName'],
            },
        ],
    });

    if (!expense) {
        throw new NotFoundError(`expense not found with id = ${expenseId}`);
    }

    if (loggedInUser.role === UserRole.USER) {
        delete expense.expenseEditHistory;

        return expense;
    }

    const [historyRows] = await sequelize.query(
        `
            SELECT 
            h.task_type,
            h.task_at,
            h.field,
            h.new_value,
            json_build_object(
                'id', u.id,
                'firstName', u.first_name,
                'lastName', u.last_name
            ) AS updater
            FROM expenses e
            CROSS JOIN LATERAL jsonb_array_elements((e.expense_edit_history->'history')::jsonb) AS h_elem
            CROSS JOIN LATERAL jsonb_to_record(h_elem) AS h(
                task_type text,
                task_by integer,
                task_at text,
                field text,
                new_value text
            )
            LEFT JOIN "users" u ON u.id = h.task_by
            WHERE e.id = :expenseId
            ORDER BY h.task_at DESC
        `,
        { replacements: { expenseId } }
    );

    const expenseData = expense.toJSON();

    if (expenseData.expenseEditHistory) {
        expenseData.expenseEditHistory.history = historyRows;
    }

    return expenseData;
};

module.exports = {
    addSingleExpenseInTheDoService,
    getSingleExpenseService,
};
