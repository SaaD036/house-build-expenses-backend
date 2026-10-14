const { DO } = require('../../models');

const {
    addDoToExpensesService,
    removeDoFromExpensesService,
    removeDoFromAllExpensesService,
} = require('../../services/dos/doExpenses');

const { prepareFiltersForAllDos } = require('../../queryHelper/dos');

const {
    sendApiSuccessResponse,
    preparePaginationResponse,
} = require('../../utilities/apiUtils/apiResponseHandler');

const { HTTP_STATUS } = require('../../constants/http');

const getAllDOs = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const { page = 1, limit = 10, shopName, doItem, fromDate, toDate, createdBy } = req.query;
        const filters = prepareFiltersForAllDos({
            page,
            limit,
            shopName,
            doItem,
            fromDate,
            toDate,
            createdBy,
        });

        const [allDOs, doCount] = await Promise.all([
            DO.scope({ method: ['houseScope', houseId] }).findAll({
                where: filters.where,
                include: [
                    {
                        association: 'creator',
                        attributes: ['id', 'firstName', 'lastName'],
                    },
                ],
                attributes: {
                    exclude: ['updatedAt', 'deleted_at'],
                },
                limit: filters.limit,
                offset: filters.offset,
                order: ['doDate'],
            }),
            DO.scope({ method: ['houseScope', houseId] }).count({ where: filters.where }),
        ]);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Do list fetched',
            data: { dos: allDOs, doCount },
            meta: preparePaginationResponse(doCount, Number(page), Number(limit)),
        });
    } catch (error) {
        next(error);
    }
};

const createDO = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { houseId } = req.params;
        const { shopName, shopAddress, doItem, description, amount, doDate } = req.body;

        await DO.create({
            shopName,
            shopAddress,
            doItem,
            description,
            houseId,
            amount: Number(amount),
            doDate: doDate ? new Date(doDate) : new Date(),
            createdBy: id,
        });

        return res.status(HTTP_STATUS.OK).json({
            message: 'DO created successfully',
        });
    } catch (error) {
        next(error);
    }
};

const addDoToExpenses = async (req, res, next) => {
    try {
        const { expenseIdx } = req.body;
        const { houseId, doId } = req.params;

        const expenseIdxArray = expenseIdx.map((idObj) => idObj.id);

        const { addedExpenses, ignoredExpenses } = await addDoToExpensesService(
            req.user.id,
            houseId,
            doId,
            expenseIdxArray
        );

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expenses added to do',
            meta: { addedExpenses, ignoredExpenses, ignoredExpensesCount: ignoredExpenses.length },
        });
    } catch (error) {
        next(error);
    }
};

const removeDoFromExpenses = async (req, res, next) => {
    try {
        const { expenseIdx } = req.body;
        const { houseId, doId } = req.params;

        const expenseIdxArray = expenseIdx.map((idObj) => idObj.id);

        const { removedExpenses, ignoredExpenses } = await removeDoFromExpensesService(
            req.user.id,
            houseId,
            doId,
            expenseIdxArray
        );

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expenses removed from do',
            meta: {
                removedExpenses,
                ignoredExpenses,
                ignoredExpensesCount: ignoredExpenses.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

const removeDoFromAllExpenses = async (req, res, next) => {
    try {
        const { doId } = req.params;

        const data = await removeDoFromAllExpensesService(req.user.id, doId);

        return sendApiSuccessResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: 'Expenses added to do',
            meta: { removedExpenses: data },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDOs,
    createDO,
    addDoToExpenses,
    removeDoFromExpenses,
    removeDoFromAllExpenses,
};
