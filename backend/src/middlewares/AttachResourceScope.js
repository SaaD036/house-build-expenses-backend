const { Op, Sequelize } = require('sequelize');

const { sequelize } = require('../models');
const { UserRole } = require('../constants/roles');

const attachResourceScope = (req, res, next) => {
    const user = req.user;

    req.getAccessFilter = ({
        entityOwnerField = 'ownerId',
        entityIdField = 'id',
        permissionTable,
    }) => {
        if (user.role !== UserRole.USER || (permissionTable || '').trim().length === 0) {
            return {};
        }

        return {
            [Op.or]: [
                { [entityOwnerField]: user.id },
                {
                    [entityIdField]: {
                        [Op.in]: Sequelize.literal(`(
                            SELECT house_id
                            FROM ${permissionTable}
                            WHERE user_id = ${sequelize.escape(user.id)}
                        )`),
                    },
                },
            ],
        };
    };

    next();
};

module.exports = attachResourceScope;
