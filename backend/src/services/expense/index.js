/* eslint-disable max-len */
const { get } = require('lodash');
const { Op } = require('sequelize');

const { sequelize, User, Expense, DO } = require('../../models');

const { getQueryToPrepareEditHistoryData } = require('../../queryHelper/EditHistory');
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
        where: { id: expenseId },
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

    const historyRows = await getQueryToPrepareEditHistoryData(
        'expenses',
        'expense_edit_history',
        expenseId
    );

    const expenseData = expense.toJSON();

    if (expenseData.expenseEditHistory) {
        expenseData.expenseEditHistory.history = historyRows;
    }

    return expenseData;
};

const getDoDetailsForExpenseService = async (expenseId, loggedInUser) => {
    const expense = await Expense.findOne({ where: { id: expenseId } });

    if (!expense) {
        throw new NotFoundError(`expense not found with id = ${expenseId}`);
    }

    if (!expense.doId) {
        return null;
    }

    if (loggedInUser.role === UserRole.USER) {
        let doDetailsForUser = await DO.findOne({
            where: { id: expense.doId },
            raw: true,
            nest: true,
            attributes: [
                'id',
                'shopName',
                'shopAddress',
                'amount',
                'doItem',
                'description',
                'doEditHistory',
                'imageURL',
                'createdAt',
                'updatedAt',
                'doDate',
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM expenses AS e
                        WHERE e.do_id = "DO"."id"
                        AND e.id != ${Number(expenseId)}
                        AND e.is_deleted = false
                    )`),
                    'otherExpenseCount',
                ],
            ],
            include: [
                {
                    association: 'creator',
                    attributes: ['id', 'firstName', 'lastName'],
                    required: false,
                },
            ],
        });

        doDetailsForUser = {
            ...doDetailsForUser,
            doEditHistoryCount: get(doDetailsForUser, 'doEditHistory.history', []).length,
        };

        delete doDetailsForUser.doEditHistory;

        return doDetailsForUser;
    }

    const doDetails = await DO.findOne({
        where: { id: expense.doId },
        include: [
            {
                association: 'creator',
                attributes: ['id', 'firstName', 'lastName'],
                required: false,
            },
            {
                association: 'expenses',
                attributes: ['id', 'amount', 'title', 'expenseAt'],
                where: {
                    id: { [Op.ne]: expenseId },
                    isDeleted: false,
                },
                required: false,
            },
            {
                model: User,
                as: 'lastUpdater',
                on: sequelize.literal(
                    '"lastUpdater"."id" = CAST(NULLIF("DO"."do_edit_history"->>\'last_updated_by\', \'\') AS INTEGER)'
                ),
                required: false,
                attributes: ['id', 'firstName', 'lastName'],
            },
        ],
    });

    const doDetailsData = {
        ...doDetails.toJSON(),
        doEditHistoryCount: get(doDetails, 'doEditHistory.history', []).length,
    };

    delete doDetailsData.doEditHistory;

    return doDetailsData;
};

module.exports = {
    addSingleExpenseInTheDoService,
    getSingleExpenseService,
    getDoDetailsForExpenseService,
};
