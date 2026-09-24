const { Sequelize, Op } = require('sequelize');

const { House, sequelize } = require('../models');

const { UserRole } = require('../constants/roles');
const { HTTP_STATUS } = require('../constants/http');
const { HOUSE_ACCESS_TYPE } = require('../constants/houses/houseAccess');

/**
 * @type          middleware
 * @desciption    Validate users' access to specific house
 */
const houseAccessMiddleware = (
    accessType,
    userRole = { allowedForVisitorAdmin: false, approved: false }
) => {
    const { allowedForVisitorAdmin } = userRole;

    return async (req, res, next) => {
        let house = null;
        const loggedInUser = req.user;
        const { houseId } = req.params;
        const { id, role } = loggedInUser;

        try {
            const isAdmin = role === UserRole.ADMIN;
            const isVisitorAdmin = allowedForVisitorAdmin && role === UserRole.VISITOR;

            if (isAdmin || isVisitorAdmin) {
                house = await House.findOne({
                    where: { id: houseId },
                    attributes: ['id', 'name'],
                });

                if (!house) {
                    return res.status(HTTP_STATUS.NOT_FOUND).json({
                        message: 'house not found',
                    });
                }

                next();
                return;
            }

            if (accessType === HOUSE_ACCESS_TYPE.CREATOR) {
                house = await House.findOne({
                    where: { id: houseId, ownerId: id },
                    attributes: ['id', 'name'],
                });
            } else {
                let accessTypeCondition = '';

                if (accessType === HOUSE_ACCESS_TYPE.CONTRIBUTOR) {
                    accessTypeCondition = `AND access_type = ${sequelize.escape(accessType)}`;
                }

                house = await House.findOne({
                    where: {
                        id: houseId,
                        [Op.or]: [
                            { ownerId: id },
                            {
                                id: {
                                    [Op.in]: Sequelize.literal(`(
                                        SELECT house_id
                                        FROM house_access
                                        WHERE user_id = ${sequelize.escape(id)}
                                        ${accessTypeCondition}
                                    )`),
                                },
                            },
                        ],
                    },
                    attributes: ['id', 'name'],
                });
            }

            if (!house) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: 'house not found',
                });
            }

            next();
        } catch (error) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'house not found',
            });
        }
    };
};

module.exports = houseAccessMiddleware;
