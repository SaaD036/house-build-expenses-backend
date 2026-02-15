const { DOs } = require('../../models');

const createDO = async (req, res, next) => {
    try {
        const { shopName, shopAddress, doItem, description, amount, doDate } = req.body;
        const { id } = req.user;

        await DOs.create({
            shopName,
            shopAddress,
            doItem,
            description,
            amount: Number(amount),
            doDate: doDate ? new Date(doDate) : new Date(),
            createdBy: id,
        });

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
