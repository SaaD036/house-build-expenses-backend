import { DoDetailsType, DoExpenseType } from '../../../Types/DOs';

export type DoDetailsForExpensePropTypes = {
    expenseId: number;
    doDetailsData: DoDetailsType | null;
    getDoDetailsForExpense: (expenseId: number) => Promise<void>;
};

export type DoExpensesListPropTypes = {
    sectionTitle: string;
    expenses: DoExpenseType[];
};

export type DoExpenseCardPropTypes = {
    expense: DoExpenseType;
};
