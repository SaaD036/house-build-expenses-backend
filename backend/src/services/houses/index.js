const { Sequelize } = require('sequelize');

const { House } = require('../../models');

const {
    prepareFiltersForHousesList,
    prepareWhereFilterForHouseAccess,
} = require('../../queryHelper/houses');

const { BadRequestError, NotFoundError } = require('../../utilities/errors/ApiError');

const { UserRole } = require('../../constants/roles');

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

module.exports = { fetchHouseListService, createHouseService, fetchHouseDetailsBySlugService };
