const { DOs } = require('../../models');

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

        const allDOs = await DOs.findAll({
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

        await DOs.create({
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

module.exports = {
    getAllDOs,
    createDO,
};
