async function seedIfTableIsEmpty(queryInterface, tableName, seedCallback) {
    const existingData = await queryInterface.select(null, tableName, { limit: 1 });

    if (existingData.length > 0) {
        console.log(`ℹ️ Table "${tableName}" already contains data. Skipping seeding.`);
        return;
    }

    return seedCallback();
}

module.exports = { seedIfTableIsEmpty };
