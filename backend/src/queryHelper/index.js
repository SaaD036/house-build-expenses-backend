const { Sequelize, Op } = require('sequelize');

const preparePaginationQuery = (params) => {
    if (!isNaN(params.page) && !isNaN(params.limit)) {
        return {
            offset: (Number(params.page) - 1) * Number(params.limit),
            limit: Number(params.limit),
        };
    }

    return {
        offset: undefined,
        limit: undefined,
    };
};

const prepareSearchByUserNameQuery = (relatedTableName, searchterm) => {
    if ((relatedTableName || '').trim().length === 0) {
        return {};
    }

    return Sequelize.where(
        Sequelize.fn(
            'CONCAT',
            Sequelize.literal(`"${relatedTableName}"."first_name"`),
            ' ',
            Sequelize.literal(`"${relatedTableName}"."last_name"`)
        ),
        { [Op.iLike]: `%${searchterm.trim()}%` }
    );
};

const prepareSearchByNameOrEmailQuery = (relatedTableName, searchTerm = '') => {
    if ((relatedTableName || '').trim().length === 0 || searchTerm.length === 0) {
        return {};
    }

    return [
        Sequelize.where(
            Sequelize.fn(
                'CONCAT',
                Sequelize.literal(`"${relatedTableName}"."first_name"`),
                ' ',
                Sequelize.literal(`"${relatedTableName}"."last_name"`)
            ),
            { [Op.iLike]: `%${searchTerm.trim()}%` }
        ),
        { [`$${relatedTableName}.email$`]: { [Op.iLike]: `%${searchTerm.trim()}%` } },
    ];
};

module.exports = {
    preparePaginationQuery,
    prepareSearchByUserNameQuery,
    prepareSearchByNameOrEmailQuery,
};
