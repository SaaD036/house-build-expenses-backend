const { Sequelize, Op } = require('sequelize');

const { House, sequelize } = require('../models');

const { UserRole } = require('../constants/roles');
const { HTTP_STATUS } = require('../constants/http');
const { HOUSE_ACCESS_TYPE } = require('../constants/houses/houseAccess');

/**
 * @param {string} accessType
 * @param {Object} options
 * @param {boolean|undefined} options.approved
 * @param {boolean|undefined} [options.addHouseToRequest]
 * @param {boolean|undefined} [params.allowedForVisitorAdmin]
 *
 * @desciption    Validate users' access to specific house
 */
const houseAccessMiddleware = (
    accessType,
    options = { approved: false, addHouseToRequest: false, allowedForVisitorAdmin: false }
) => {
    const { addHouseToRequest, allowedForVisitorAdmin } = options;

    return async (req, res, next) => {
        let house = null;
        const loggedInUser = req.user;
        const { houseId } = req.params;
        const { id, role } = loggedInUser;

        try {
            const isAdmin = role === UserRole.ADMIN;
            const isVisitorAdmin = allowedForVisitorAdmin && role === UserRole.VISITOR;
            const attributes = addHouseToRequest
                ? ['id', 'slug', 'name', 'address']
                : ['id', 'name'];

            if (isAdmin || isVisitorAdmin) {
                house = await House.findOne({
                    where: { id: houseId },
                    attributes,
                });

                if (!house) {
                    return res.status(HTTP_STATUS.NOT_FOUND).json({
                        message: 'house not found',
                    });
                }

                if (addHouseToRequest) {
                    req.house = house;
                }

                next();
                return;
            }

            if (accessType === HOUSE_ACCESS_TYPE.CREATOR) {
                house = await House.findOne({
                    where: { id: houseId, ownerId: id },
                    attributes,
                });
            } else {
                let accessTypeCondition = '';

                if (accessType === HOUSE_ACCESS_TYPE.CONTRIBUTOR) {
                    accessTypeCondition = `AND access_type = ${sequelize.escape(accessType)}`;
                }

                house = await House.findOne({
                    attributes,
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
                });
            }

            if (!house) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: 'house not found',
                });
            }

            if (addHouseToRequest) {
                req.house = house;
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
