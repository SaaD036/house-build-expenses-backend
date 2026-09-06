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
            value: expense.expenseAt,
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
