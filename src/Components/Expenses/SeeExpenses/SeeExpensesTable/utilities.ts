import { ExpenseType } from '../../../../Types/expenses';

export const getExpenseTableRows = (
    expenses: ExpenseType[],
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
            value: `${expense.creator.firstName} ${expense.creator.lastName}`,
        },
        action: {
            value: getActionColumnItem(expense),
        },
    }));

    return expenseTableRows;
};
