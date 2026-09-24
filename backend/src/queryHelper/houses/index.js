const { Sequelize, Op } = require('sequelize');

const { preparePaginationQuery, prepareSearchByUserNameQuery } = require('..');

const { sequelize } = require('../../models');
const { UserRole } = require('../../constants/roles');

/**
 * @return {offset, limit, where}
 */
const prepareFiltersForHousesList = (params) => {
    const filter = { ...preparePaginationQuery(params) };
    let where = {};

    if (params.name) {
        where = {
            ...where,
            name: {
                [Op.iLike]: `%${params.name}%`,
            },
        };
    }

    if (!isNaN(params.floorCount)) {
        const { floorCountOperator } = params;
        const operator =
            floorCountOperator === 'l' ? Op.lt : floorCountOperator === 'e' ? Op.eq : Op.gt;

        where = {
            ...where,
            floorCount: {
                [operator]: Number(params.floorCount),
            },
        };
    }

    if (params.ownerName && params.ownerName.trim().length >= 1) {
        where = {
            ...where,
            [Op.and]: [prepareSearchByUserNameQuery('owner', params.ownerName)],
        };
    }

    return {
        ...filter,
        where,
    };
};

const prepareWhereFilterForHouseAccess = (loggedInUser, existingWhere = {}) => {
    if (loggedInUser.role !== UserRole.USER) {
        return existingWhere;
    }

    const userAccessWhere = {
        [Op.or]: [
            { ownerId: loggedInUser.id },
            {
                id: {
                    [Op.in]: Sequelize.literal(`(
                        SELECT house_id
                        FROM house_access
                        WHERE user_id = ${sequelize.escape(loggedInUser.id)})
                    `),
                },
            },
        ],
    };

    return {
        ...existingWhere,
        ...userAccessWhere,
    };
};

module.exports = {
    prepareFiltersForHousesList,
    prepareWhereFilterForHouseAccess,
};
