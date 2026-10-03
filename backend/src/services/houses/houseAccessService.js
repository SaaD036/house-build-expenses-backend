const { Op } = require('sequelize');

const { User, HouseAccess, HouseEditHistory, sequelize } = require('../../models');

const {
    prepareDataForHouseEditTableRow,
    prepareValueColumnDataForHouseEdit,
} = require('../../utilities/houses/houseEditHistoryUtilities');
const {
    prepareFilterForHouseAccessUsers,
    prepareWhereFilterForAvailableUsersForHouse,
} = require('../../queryHelper/houses');

const { BadRequestError } = require('../../utilities/errors/ApiError');

const { HOUSE_TABLES } = require('../../constants/houses');
const { HOUSE_ACCESS_TABLE_COLUMN_NAMES } = require('../../constants/houses/houseTablesColumnName');

const fetchAccessListForHouseService = async (houseId, params) => {
    const { where, offset, limit } = prepareFilterForHouseAccessUsers({ houseId, ...params });

    const [houseAccess, houseAccessCount] = await Promise.all([
        HouseAccess.findAll({
            where,
            limit,
            offset,
            include: [
                {
                    association: 'user',
                    required: true,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
                {
                    association: 'accessorProvider',
                    required: true,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
            ],
            attributes: ['id', 'accessType', 'createdAt', 'updatedAt'],
        }),
        HouseAccess.count({
            where,
            include: [
                {
                    association: 'user',
                    required: true,
                    attributes: [],
                },
            ],
        }),
    ]);

    return { houseAccess, houseAccessCount };
};

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

const removeUserAccessesFromHouseService = async (houseId, usersIdx, loggedInUser) => {
    const users = await User.findAll({
        attributes: ['id'],
        include: [
            {
                association: 'houseAccess',
                attributes: ['accessType', 'accessBy', 'createdAt'],
                where: {
                    houseId,
                },
                required: true,
            },
        ],
        raw: true,
        nest: true,
    });

    const userIdxWithAccessMap = new Map();

    for (const u of users) {
        userIdxWithAccessMap.set(u.id, u.houseAccess);
    }

    const payLoadUserIdxWithNoAccess = usersIdx.filter((u) => !userIdxWithAccessMap.has(u));
    const payLoadUserIdxWithAccess = usersIdx.filter((u) => userIdxWithAccessMap.has(u));

    if (payLoadUserIdxWithAccess.length === 0) {
        return {
            requestedUserIds: usersIdx,
            removedCount: 0,
            ignoredUserIds: usersIdx,
        };
    }

    await sequelize.transaction(async (t) => {
        const historyLog = payLoadUserIdxWithAccess.map((u) =>
            prepareDataForHouseEditTableRow(
                houseId,
                loggedInUser.id,
                HOUSE_TABLES.HOUSE_ACCESS,
                HOUSE_ACCESS_TABLE_COLUMN_NAMES.removeRow.dbKey,
                prepareValueColumnDataForHouseEdit(null, u, userIdxWithAccessMap.get(u))
            )
        );

        await Promise.all([
            HouseAccess.destroy({
                where: {
                    houseId,
                    userId: {
                        [Op.in]: payLoadUserIdxWithAccess,
                    },
                },
                transaction: t,
            }),
            HouseEditHistory.bulkCreate(historyLog, { transaction: t }),
        ]);
    });

    return {
        requestedUserIds: usersIdx,
        removedCount: payLoadUserIdxWithAccess.length,
        ignoredUserIds: payLoadUserIdxWithNoAccess,
    };
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
    fetchAccessListForHouseService,
    removeUserAccessesFromHouseService,
    fetchAvailableUserListForHouseAccess,
};
