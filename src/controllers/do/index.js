const createDO = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: 'DO created successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDO,
};
