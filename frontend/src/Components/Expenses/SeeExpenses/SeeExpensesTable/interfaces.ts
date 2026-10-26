import { ExpenseType } from '../../../../Types/expenses';
import { HouseType } from '../../../../Types/Houses';
import { CustomTableLoadDataTypes } from '../../../Custom/CustomTable/interfaces';

export type SeeExpensesTableProps = {
    loggedInUser: string | null;
    house?: HouseType | null;
    expenses: ExpenseType[];
    expensesCount: number;
    getAllExpenses: (
        houseId: number | undefined,
        filters: CustomTableLoadDataTypes
    ) => Promise<void>;
    deleteSingleExpense: (houseId: number | undefined, expenseId: number) => Promise<void>;
    showLoader: () => void;
    hideLoader: () => void;
};

export type SeeExpensesTablePopersProps = {
    selectedExpense: ExpenseType;
    setSelectedExpense: (expense: ExpenseType | null) => void;
    actionColumMenuAnchorEl: HTMLElement | null;
    setActionColumMenuAnchorEl: (el: HTMLElement | null) => void;
    showLoader: () => void;
    onDeleteExpense: () => Promise<void>;
    loadExpenseData: () => Promise<void>;
};

export type ShowUserProfilePopupType = {
    showUserProfileAnchorEl: HTMLElement;
    userId: number;
};
