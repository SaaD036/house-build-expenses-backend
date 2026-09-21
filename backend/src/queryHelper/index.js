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
            'concat',
            Sequelize.col(`${relatedTableName}.first_name`),
            ' ',
            Sequelize.col(`${relatedTableName}.last_name`)
        ),
        { [Op.iLike]: `%${searchterm.trim()}%` }
    );
};

module.exports = {
    preparePaginationQuery,
    prepareSearchByUserNameQuery,
};
