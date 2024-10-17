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

module.exports = {
    preparePaginationQuery,
};
