import { formatDate } from '../../../../Utilities/Date';

import { ExpenseType } from '../../../../Types/expenses';

export const getExpenseTableRows = (
    expenses: ExpenseType[],
    getUserNameColumnItem: (expense: ExpenseType) => JSX.Element,
    getActionColumnItem: (expense: ExpenseType) => JSX.Element
) => {
    const expenseTableRows = expenses.map((expense) => ({
        title: {
            value: expense.title,
        },
        amount: {
            value: expense.amount,
        },
        description: {
            value: expense.description,
        },
        expense_time: {
            value: formatDate(expense.expenseAt, 'm-short-dy-numeric'),
        },
        creator: {
            value: getUserNameColumnItem(expense),
        },
        action: {
            value: getActionColumnItem(expense),
        },
    }));

    return expenseTableRows;
};
