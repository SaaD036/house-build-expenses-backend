import { ExpenseType } from '../../../../Types/expenses';
import { CustomTableLoadDataTypes } from '../../../Custom/CustomTable/interfaces';

export type SeeExpensesTableProps = {
    loggedInUser: string | null;
    expenses: ExpenseType[];
    expensesCount: number;
    getAllExpenses: (filters: CustomTableLoadDataTypes) => Promise<void>;
    deleteSingleExpense: (id: number) => Promise<void>;
    showLoader: () => void;
    hideLoader: () => void;
};
