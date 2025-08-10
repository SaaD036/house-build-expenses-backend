const { Op, Sequelize } = require('sequelize');

const { preparePaginationQuery } = require('..');

const prepareQueryFilterForAllusers = (params) => {
    const filter = { ...preparePaginationQuery(params) };
    let where = {};

    if (params.name) {
        where = {
            [Op.and]: [
                Sequelize.where(Sequelize.literal('first_name || last_name'), {
                    [Op.iLike]: `%${params.name}%`,
                }),
            ],
        };
    }

    if (params.email) {
        where[Op.and].push({
            email: {
                [Op.iLike]: `%${params.email}%`,
            },
        });
    }

    if (params.role) {
        where[Op.and].push({
            role: {
                [Op.eq]: role,
            },
        });
    }

    if (params.accountStatus) {
        where[Op.and].push({
            accountStatus: {
                [Op.eq]: accountStatus,
            },
        });
    }

    return {
        ...filter,
        where,
    };
};

module.exports = {
    prepareQueryFilterForAllusers,
};
