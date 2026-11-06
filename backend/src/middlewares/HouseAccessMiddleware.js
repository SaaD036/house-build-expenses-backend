const { Sequelize, Op } = require('sequelize');

const { House, sequelize } = require('../models');

const { sendApiErrorResponse } = require('../utilities/apiUtils/apiResponseHandler');

const { UserRole } = require('../constants/roles');
const { HTTP_STATUS } = require('../constants/http');
const { HOUSE_ACCESS_TYPE } = require('../constants/houses/houseAccess');

/**
 * @param {string} accessType
 * @param {Object} options
 * @param {boolean|undefined} options.approved
 * @param {boolean|undefined} [options.addHouseToRequest]
 * @param {boolean|undefined} [options.allowedForVisitorAdmin]
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
            const isVisitorAdmin =
                role === UserRole.VISITOR &&
                (allowedForVisitorAdmin || accessType === HOUSE_ACCESS_TYPE.VIEWER);

            const attributes = addHouseToRequest
                ? ['id', 'slug', 'name', 'address', 'ownerId']
                : ['id', 'name'];

            if (isAdmin || isVisitorAdmin) {
                house = await House.findOne({
                    where: { id: houseId },
                    attributes,
                });

                if (!house) {
                    return sendApiErrorResponse(res, {
                        statusCode: HTTP_STATUS.NOT_FOUND,
                        message: 'House not found',
                        errorTrace: `House with id = ${
                            houseId
                        } not found or user has no access to this house`,
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
                    raw: true,
                    nest: true,
                });
            }

            if (!house) {
                return sendApiErrorResponse(res, {
                    statusCode: HTTP_STATUS.NOT_FOUND,
                    message: 'House not found',
                    errorTrace: `House with id = ${
                        houseId
                    } not found or user has no access to this house`,
                });
            }

            if (addHouseToRequest) {
                req.house = { ...house, access: accessType };
            }

            next();
        } catch (error) {
            return sendApiErrorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: 'House not found',
                errorTrace: `House with id = ${
                    houseId
                } not found or user has no access to this house`,
            });
        }
    };
};

module.exports = houseAccessMiddleware;
