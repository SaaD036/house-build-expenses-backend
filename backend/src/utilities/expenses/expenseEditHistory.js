const createExpenseEditHistoryItem = (task_type, field, task_by, new_value, old_value) => {
    let item = {
        task_type,
        task_by,
        task_at: new Date(),
    };

    if (field) {
        item = {
            ...item,
            field,
        };
    }

    if (new_value) {
        item = {
            ...item,
            new_value,
        };
    }

    if (old_value) {
        item = {
            ...item,
            old_value,
        };
    }

    return item;
};

module.exports = {
    createExpenseEditHistoryItem,
};
