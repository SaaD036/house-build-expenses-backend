const { Op } = require('sequelize');

const { User, HouseAccess, HouseEditHistory, sequelize } = require('../../models');

const {
    prepareDataForHouseEditTableRow,
    prepareValueColumnDataForHouseEdit,
} = require('../../utilities/houses/houseEditHistoryUtilities');
const { prepareWhereFilterForAvailableUsersForHouse } = require('../../queryHelper/houses');

const { BadRequestError } = require('../../utilities/errors/ApiError');

const { HOUSE_TABLES } = require('../../constants/houses');
const { HOUSE_ACCESS_TABLE_COLUMN_NAMES } = require('../../constants/houses/houseTablesColumnName');

const addAccessToHouseService = async (userAccessPayload, house, loggedInUser) => {
    const userIds = [];
    const userIdxMap = new Map();
    const { id: houseId, ownerId } = house;

    for (const item of userAccessPayload) {
        const { userId, accessType } = item || {};

        if (Number(userId) === Number(loggedInUser.id)) {
            throw new BadRequestError('you can not update your access');
        }

        if (Number(userId) === Number(ownerId)) {
            throw new BadRequestError('owner can not be inserted for access');
        }

        if (userIdxMap.has(Number(userId))) {
            throw new BadRequestError('same user is requested for muultiple times');
        }

        userIds.push(Number(userId));
        userIdxMap.set(Number(userId), accessType);
    }

    return await sequelize.transaction(async (transaction) => {
        const validUsersCount = await User.count({
            where: {
                id: { [Op.in]: userIds },
                accountStatus: 'active',
            },
            transaction,
        });

        if (validUsersCount !== userIds.length) {
            throw new BadRequestError('there are some invalid users requested');
        }

        const existingAccesses = await HouseAccess.findAll({
            where: {
                houseId,
                userId: { [Op.in]: userIds },
            },
            transaction,
        });

        const existingAccessMap = new Map(
            existingAccesses.map((acc) => [
                acc.userId,
                { previousAccess: acc.accessType, rowId: acc.id },
            ])
        );

        const historyLogs = [];
        const recordsToUpsertInAccessTable = [];

        for (const [uId, newAccess] of userIdxMap.entries()) {
            recordsToUpsertInAccessTable.push({
                houseId,
                userId: uId,
                accessType: newAccess,
                accessBy: loggedInUser.id,
            });

            const { previousAccess, rowId } = existingAccessMap.get(uId) || {};

            if (!!previousAccess && previousAccess !== newAccess) {
                historyLogs.push(
                    prepareDataForHouseEditTableRow(
                        houseId,
                        loggedInUser.id,
                        HOUSE_TABLES.HOUSE_ACCESS,
                        HOUSE_ACCESS_TABLE_COLUMN_NAMES.newRow.dbKey,
                        prepareValueColumnDataForHouseEdit(newAccess, previousAccess, { rowId })
                    )
                );
            }
        }

        const updatedAccessRecords = await HouseAccess.bulkCreate(recordsToUpsertInAccessTable, {
            updateOnDuplicate: ['accessType', 'updatedAt'],
            transaction,
            returning: true,
        });

        if (historyLogs.length > 0) {
            await HouseEditHistory.bulkCreate(historyLogs, { transaction });
        }

        return updatedAccessRecords;
    });
};

const fetchAvailableUserListForHouseAccess = async (house, params) => {
    const { id: houseId, ownerId } = house;
    const { where, limit, offset } = prepareWhereFilterForAvailableUsersForHouse({
        ...params,
        houseOwnerId: ownerId,
    });

    const [users, totalUserCount] = await Promise.all([
        User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: [
                {
                    association: 'houseAccess',
                    where: { houseId },
                    required: false,
                    attributes: [],
                },
            ],
            where: {
                ...where,
                '$houseAccess.id$': null,
            },
            limit,
            offset,
            order: [['firstName', 'ASC']],
            subQuery: false,
            distinct: true,
        }),
        User.count({
            include: [
                {
                    association: 'houseAccess',
                    where: { houseId },
                    required: false,
                    attributes: [],
                },
            ],
            where: {
                ...where,
                '$houseAccess.id$': null,
            },
            subQuery: false,
            distinct: true,
        }),
    ]);

    return { users, totalUserCount };
};

module.exports = {
    addAccessToHouseService,
    fetchAvailableUserListForHouseAccess,
};
