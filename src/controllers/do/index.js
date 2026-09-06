const { DO } = require('../../models');

const {
    addDoToExpensesService,
    removeDoFromExpensesService,
    removeDoFromAllExpensesService,
} = require('../../services/dos/doExpenses');

const { prepareFiltersForAllDos } = require('../../queryHelper/dos');

const { HTTP_STATUS } = require('../../constants/http');

const getAllDOs = async (req, res, next) => {
    try {
        const { page, limit, shopName, doItem, fromDate, toDate, createdBy } = req.query;
        const filters = prepareFiltersForAllDos({
            page,
            limit,
            shopName,
            doItem,
            fromDate,
            toDate,
            createdBy,
        });

        const allDOs = await DO.findAll({
            where: filters.where,
            include: [
                {
                    association: 'creator',
                    attributes: ['id', 'firstName', 'lastName'],
                },
            ],
            limit: filters.limit,
            offset: filters.offset,
            order: ['doDate'],
        });

        return res.status(HTTP_STATUS.OK).json({
            do: allDOs,
        });
    } catch (error) {
        next(error);
    }
};

const createDO = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { shopName, shopAddress, doItem, description, amount, doDate } = req.body;

        await DO.create({
            shopName,
            shopAddress,
            doItem,
            description,
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
        const { doId } = req.params;
        const { expenseIdx } = req.body;

        const expenseIdxArray = expenseIdx.map((idObj) => idObj.id);

        await addDoToExpensesService(req.user.id, doId, expenseIdxArray);

        return res.status(HTTP_STATUS.OK).json({
            message: 'do addedd successfully to expenses',
        });
    } catch (error) {
        next(error);
    }
};

const removeDoFromExpenses = async (req, res, next) => {
    try {
        const { doId } = req.params;
        const { expenseIdx } = req.body;

        const expenseIdxArray = expenseIdx.map((idObj) => idObj.id);

        await removeDoFromExpensesService(req.user.id, doId, expenseIdxArray);

        return res.status(HTTP_STATUS.OK).json({
            message: 'do removed successfully from expenses',
        });
    } catch (error) {
        next(error);
    }
};

const removeDoFromAllExpenses = async (req, res, next) => {
    try {
        const { doId } = req.params;

        await removeDoFromAllExpensesService(req.user.id, doId);

        return res.status(HTTP_STATUS.OK).json({
            message: 'do removed successfully from expenses',
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
