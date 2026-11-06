'use strict';

const slugify = require('slugify');

/**
 * @param {Object} queryInterface
 * @param {string} tableName
 * @param {Object} transaction
 */
async function backfillHouseIdInExpenseAndDoTable(queryInterface, tableName, transaction) {
    const recordsCount = await queryInterface.rawSelect(tableName, { transaction }, ['id']);

    if (!recordsCount) {
        return;
    }

    const userHouseMap = new Map();
    const existingHouses = await queryInterface.select(null, 'houses', {
        attributes: ['id', 'owner_id'],
        where: { deleted_at: null },
        order: [['id', 'ASC']],
        transaction,
    });

    for (const house of existingHouses) {
        if (house.owner_id && !userHouseMap.has(house.owner_id)) {
            userHouseMap.set(house.owner_id, house.id);
        }
    }

    const tableRecords = await queryInterface.select(null, tableName, {
        attributes: ['id', 'created_by'],
        where: { house_id: null },
        transaction,
    });

    for (const record of tableRecords) {
        let targetHouseId = null;
        const creatorId = record.created_by;

        if (userHouseMap.has(creatorId)) {
            targetHouseId = userHouseMap.get(creatorId);
        } else {
            const houseName = `House of User ${creatorId}`;
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            const slugPart = `${slugify(houseName, { lower: true, strict: true })}`;
            const slug = `${slugPart}-${Date.now()}-${randomSuffix}`;

            const [insertedHouse] = await queryInterface.bulkInsert(
                'houses',
                [
                    {
                        name: `House of User ${creatorId}`,
                        slug,
                        address: JSON.stringify({
                            area: 'N/A',
                            district: 'N/A',
                            upazilla: 'N/A',
                            address_line: 'N/A',
                        }),
                        owner_id: creatorId,
                        is_approved: true,
                        is_deleted: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        deleted_at: null,
                    },
                ],
                { returning: true, transaction }
            );

            targetHouseId = insertedHouse.id;
            userHouseMap.set(creatorId, targetHouseId);
        }

        await queryInterface.bulkUpdate(
            tableName,
            { house_id: targetHouseId },
            { id: record.id },
            { transaction }
        );
    }
}

module.exports = { backfillHouseIdInExpenseAndDoTable };
