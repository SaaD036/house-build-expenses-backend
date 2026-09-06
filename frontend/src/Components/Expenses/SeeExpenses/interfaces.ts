import { ExpenseType } from '../../../Types/expenses';

export type SeeExpensesPropsType = {
    expenses: ExpenseType[] | null;
    expensesCount: number;
    getAllExpenses: (filters: any) => Promise<void>;
};
