const { House } = require('../../models');

const { BadRequestError } = require('../../utilities/errors/ApiError');

const { UserRole } = require('../../constants/roles');

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

module.exports = { createHouseService };
