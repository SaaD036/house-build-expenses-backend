/* eslint-disable max-len */
const { get } = require('lodash');
const { Op } = require('sequelize');

const { sequelize, User, Expense, DO } = require('../../models');

const { getQueryToPrepareEditHistoryData } = require('../../queryHelper/EditHistory');
const { createExpenseEditHistoryItem } = require('../../utilities/expenses/expenseEditHistory');

const { HOUSE_ACCESS_TYPE } = require('../../constants/houses/houseAccess');
const { NotFoundError } = require('../../utilities/errors/ApiError');

const removeExpensesService = async (expenseIds, houseId, userId) => {
    const validExpenses = await Expense.scope({ method: ['houseScope', houseId] }).findAll({
        where: {
            id: {
                [Op.in]: expenseIds,
            },
        },
        attributes: ['id'],
    });

    let deletedCount = 0;
    const validExpenseIds = validExpenses.map((expense) => expense.id);
    const ignoredExpenseIds = expenseIds.filter((id) => !validExpenseIds.includes(id));

    if (validExpenseIds.length > 0) {
        deletedCount = await Expense.destroy({
            where: {
                id: {
                    [Op.in]: validExpenseIds,
                },
            },
        });
    }

    return {
        deletedCount,
        deletedIds: validExpenseIds,
        ignoredIds: ignoredExpenseIds,
    };
};

const addSingleExpenseInTheDoService = async (userId, houseId, expenseId, doId) => {
    const [expense, theDo] = await Promise.all([
        Expense.scope({ method: ['houseScope', houseId] }).findOne({ where: { id: expenseId } }),
        DO.findOne({ where: { id: doId, houseId } }),
    ]);

    if (!expense) {
        throw new NotFoundError(`expense with id=${expenseId} not found`);
    }

    if (!theDo) {
        throw new NotFoundError(`do with id=${doId} not found`);
    }

    if (Number(expense.doId) === Number(doId)) {
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

const getSingleExpenseService = async (house, expenseId) => {
    const { id: houseId } = house;

    console.log('SaaD 1 : ', houseId);

    const expense = await Expense.scope({ method: ['houseScope', houseId] }).findOne({
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

    console.log('SaaD 2 : ', houseId);

    if (!expense) {
        throw new NotFoundError(`expense not found with id = ${expenseId}`);
    }

    if (house.access === HOUSE_ACCESS_TYPE.VIEWER) {
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

const getDoDetailsForExpenseService = async (house, expenseId) => {
    const { id: houseId } = house;

    const expense = await Expense.scope({ method: ['houseScope', houseId] }).findOne({
        where: { id: expenseId },
    });

    if (!expense) {
        throw new NotFoundError(`expense not found with id = ${expenseId}`);
    }

    if (!expense.doId) {
        return null;
    }

    if (house.access === HOUSE_ACCESS_TYPE.VIEWER) {
        let doDetailsForUser = await DO.findOne({
            where: { id: expense.doId, houseId },
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

const deleteExpenseService = async (houseId, expenseID, loggedInUserId) => {
    const expense = await Expense.scope({ method: ['houseScope', houseId] }).findOne({
        where: {
            id: expenseID,
        },
    });

    if (!expense) {
        return;
    }

    expense.isDeleted = true;
    expense.deletedAt = new Date();
    expense.expenseEditHistory = {
        last_updated_by: loggedInUserId,
        history: [
            ...get(expense, 'expenseEditHistory.history', []),
            {
                task_type: 'delete',
                task_by: loggedInUserId,
                task_at: new Date(),
            },
        ],
    };

    await expense.save();
};

module.exports = {
    deleteExpenseService,
    removeExpensesService,
    getSingleExpenseService,
    addSingleExpenseInTheDoService,
    getDoDetailsForExpenseService,
};
