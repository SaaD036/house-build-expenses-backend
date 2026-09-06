const getErrorResponse = (errorMessage) => {
    return {
        error: {
            message: errorMessage,
        },
    };
};

module.exports = {
    getErrorResponse,
};
