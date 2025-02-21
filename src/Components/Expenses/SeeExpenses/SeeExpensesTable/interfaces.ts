import { ExpenseType } from '../../../../Types/expenses';
import { CustomTableLoadDataTypes } from '../../../Custom/CustomTable/interfaces';

export type SeeExpensesTableProps = {
    expenses: ExpenseType[];
    expensesCount: number;
    getAllExpenses: (filters: CustomTableLoadDataTypes) => Promise<void>;
    showLoader: () => void;
    hideLoader: () => void;
};
