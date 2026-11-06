const { Sequelize, Op } = require('sequelize');

const {
    preparePaginationQuery,
    prepareSearchByUserNameQuery,
    prepareSearchByNameOrEmailQuery,
} = require('..');

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

/**
 * @param {Object} params
 * @param {number|string} params.houseId
 * @param {number|string} [params.editor]
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 *
 * @return {{ offset, limit, where }}
 */
const prepareWhereFilterForHouseEditHistory = (params) => {
    let where = {};
    const { editor, houseId } = params;
    const filter = { ...preparePaginationQuery(params) };

    if (houseId) {
        where = { ...where, houseId };
    }

    if (editor.length >= 1) {
        where = {
            ...where,
            [Op.or]: [prepareSearchByUserNameQuery('editor', editor)],
        };
    }

    return {
        ...filter,
        where,
    };
};

/**
 * @param {Object} params
 * @param {string|undefined} params.searchTerm
 * @param {number} params.houseOwnerId
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 *
 * @return {{ offset, limit, where }}
 */
const prepareWhereFilterForAvailableUsersForHouse = (params) => {
    let where = {};
    const { searchTerm = '', houseOwnerId } = params;
    const filter = { ...preparePaginationQuery(params) };

    where = {
        ...where,
        id: {
            [Op.ne]: houseOwnerId,
        },
        accountStatus: 'active',
        role: UserRole.USER,
    };

    if (searchTerm.length > 0) {
        where = {
            ...where,
            [Op.or]: [
                Sequelize.where(
                    Sequelize.fn(
                        'CONCAT',
                        Sequelize.literal('"User"."first_name"'),
                        ' ',
                        Sequelize.literal('"User"."last_name"')
                    ),
                    { [Op.iLike]: `%${searchTerm}%` }
                ),
                { email: { [Op.iLike]: `%${searchTerm}%` } },
            ],
        };
    }

    return {
        ...filter,
        where,
    };
};

/**
 * @param {Object} params
 * @param {number} params.houseId
 * @param {string|undefined} params.searchTerm
 * @param {number} params.accessType
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 *
 * @return {{ offset, limit, where }}
 */
const prepareFilterForHouseAccessUsers = (params) => {
    const { houseId, searchTerm = '', accessType = '' } = params;

    let where = { houseId };
    const filter = { ...preparePaginationQuery(params) };

    if (searchTerm.trim().length > 0) {
        where = {
            ...where,
            [Op.or]: prepareSearchByNameOrEmailQuery('user', searchTerm),
        };
    }

    if (accessType.trim().length >= 1) {
        where = {
            ...where,
            accessType,
        };
    }

    return {
        ...filter,
        where,
    };
};

module.exports = {
    prepareFiltersForHousesList,
    prepareFilterForHouseAccessUsers,
    prepareWhereFilterForHouseAccess,
    prepareWhereFilterForHouseEditHistory,
    prepareWhereFilterForAvailableUsersForHouse,
};
