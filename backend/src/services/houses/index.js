const { House } = require('../../models');

const {
    prepareFiltersForHousesList,
    prepareWhereFilterForHouseAccess,
} = require('../../queryHelper/houses');

const { BadRequestError } = require('../../utilities/errors/ApiError');

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

module.exports = { fetchHouseListService, createHouseService };
