import { ExpenseType } from '../../../../Types/expenses';
import { IconTypes } from '../../../../Types/IconsAndImages';

export const createActionColumnMenuItem = (
    key: string,
    label: string,
    Icon: IconTypes,
    onClick: () => void
) => {
    return { key, label, Icon, onClick };
};

export const getExpenseTableRows = (expenses: ExpenseType[], actionColumnItem: JSX.Element) => {
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
            value: actionColumnItem,
        },
    }));

    return expenseTableRows;
};
