const { Sequelize } = require('sequelize');

const { House, HouseEditHistory, sequelize } = require('../../models');

const {
    prepareFiltersForHousesList,
    prepareWhereFilterForHouseAccess,
} = require('../../queryHelper/houses');

const {
    prepareDataForHouseEditTableRow,
    prepareValueColumnDataForHouseEdit,
} = require('../../utilities/houses/houseEditHistoryUtilities');
const { compareHouseAddress } = require('../../utilities/houses/houseAddressUtilities');
const { BadRequestError, NotFoundError } = require('../../utilities/errors/ApiError');

const { UserRole } = require('../../constants/roles');
const { HOUSE_TABLES } = require('../../constants/houses');
const { HOUSE_TABLE_COLUMN_NAMES } = require('../../constants/houses/houseTablesColumnName');

const fetchHouseListService = async (params, loggedInUser) => {
    const { offset, limit, where } = prepareFiltersForHousesList(params);

    const [housesList, houseCount] = await Promise.all([
        House.findAll({
            include: [
                {
                    association: 'owner',
                    attributes: ['id', 'firstName', 'lastName'],
                },
            ],
            offset,
            limit,
            where: prepareWhereFilterForHouseAccess(loggedInUser, where),
        }),
        House.count({ where: prepareWhereFilterForHouseAccess(loggedInUser, where) }),
    ]);

    return { housesList, houseCount };
};

const createHouseService = async (name, address, floorCount, loggedInUser) => {
    const houseCount = await House.count({ where: { ownerId: loggedInUser.id } });

    if (houseCount >= 2) {
        throw new BadRequestError('you already have created 2 houses');
    }

    await House.create({
        name,
        address,
        floorCount: isNaN(floorCount) ? 1 : Number(floorCount),
        ownerId: loggedInUser.id,
        isApproved: loggedInUser.role === UserRole.ADMIN,
    });
};

const fetchHouseDetailsBySlugService = async (slug, loggedInUser) => {
    const houseDetails = await House.findOne({
        where: prepareWhereFilterForHouseAccess(loggedInUser, {
            slug,
        }),
        include: [
            {
                association: 'owner',
                attributes: ['id', 'firstName', 'lastName'],
            },
        ],
        attributes: {
            include: [
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)::integer 
                        FROM house_access AS ha 
                        WHERE ha.house_id = "House"."id"
                    )`),
                    'accessCount',
                ],
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)::integer 
                        FROM house_edit_history AS heh 
                        WHERE heh.house_id = "House"."id"
                    )`),
                    'editCount',
                ],
            ],
        },
    });

    if (!houseDetails) {
        throw new NotFoundError('house not found');
    }

    const houseData = houseDetails.toJSON();

    if (houseData.ownerId !== loggedInUser.id && loggedInUser.role === UserRole.USER) {
        delete houseData.accessCount;
        delete houseData.editCount;
    }

    return houseData;
};

const updateHouseService = async (id, bodyData = {}, loggedInUser) => {
    const { name, floorCount, address } = bodyData;
    const updateLog = [];

    const houseDetails = await House.findOne({
        where: { id },
    });

    if (!houseDetails) {
        throw new NotFoundError('house not found');
    }

    if ((name || '').trim().length >= 1 && (name || '').trim() !== houseDetails.name) {
        updateLog.push(
            prepareDataForHouseEditTableRow(
                id,
                loggedInUser.id,
                HOUSE_TABLES.HOUSE,
                HOUSE_TABLE_COLUMN_NAMES.name.dbKey,
                prepareValueColumnDataForHouseEdit(name.trim(), houseDetails.name)
            )
        );

        houseDetails.name = name.trim();
    }

    if (!isNaN(floorCount) && Number(floorCount) !== houseDetails.floorCount) {
        updateLog.push(
            prepareDataForHouseEditTableRow(
                id,
                loggedInUser.id,
                HOUSE_TABLES.HOUSE,
                HOUSE_TABLE_COLUMN_NAMES.floorCount.dbKey,
                prepareValueColumnDataForHouseEdit(Number(floorCount), houseDetails.floorCount)
            )
        );

        houseDetails.floorCount = Number(floorCount);
    }

    if (!!address && !compareHouseAddress(address)) {
        updateLog.push(
            prepareDataForHouseEditTableRow(
                id,
                loggedInUser.id,
                HOUSE_TABLES.HOUSE,
                HOUSE_TABLE_COLUMN_NAMES.address.dbKey,
                prepareValueColumnDataForHouseEdit(address, houseDetails.address)
            )
        );

        houseDetails.address = address;
    }

    if (updateLog.length === 0) {
        return;
    }

    await sequelize.transaction(async (t) => {
        await Promise.all([
            houseDetails.save({ transaction: t }),
            HouseEditHistory.bulkCreate(updateLog, { transaction: t }),
        ]);
    });
};

module.exports = {
    fetchHouseListService,
    createHouseService,
    updateHouseService,
    fetchHouseDetailsBySlugService,
};
