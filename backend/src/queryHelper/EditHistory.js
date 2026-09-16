const { sequelize } = require('../models');

const getQueryToPrepareEditHistoryData = async (tableName, historyColumnName, id) => {
    const [historyRows] = await sequelize.query(
        `
            SELECT 
            h.task_type,
            h.task_at,
            h.field,
            h.new_value,
            h.old_value,
            json_build_object(
                'id', u.id,
                'firstName', u.first_name,
                'lastName', u.last_name
            ) AS updater
            FROM ${tableName} tn
            CROSS JOIN LATERAL jsonb_array_elements(
                (tn."${historyColumnName}"->'history')::jsonb
            ) AS h_elem
            CROSS JOIN LATERAL jsonb_to_record(h_elem) AS h(
                task_type text,
                task_by integer,
                task_at text,
                field text,
                new_value text,
                old_value text
            )
            LEFT JOIN "users" u ON u.id = h.task_by
            WHERE tn.id = :id
            ORDER BY h.task_at DESC
        `,
        { replacements: { id } }
    );

    return historyRows;
};

module.exports = {
    getQueryToPrepareEditHistoryData,
};
