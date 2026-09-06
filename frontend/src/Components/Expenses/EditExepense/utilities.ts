import { ExpenseType } from '../../../Types/expenses';

export const getInitialValueForEditExpenseForm = (expense: ExpenseType) => {
    return {
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        expense_at: new Date(expense.expenseAt),
    };
};
