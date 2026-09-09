import { UserRoleType } from '../../../Types/Users';
import { ExpenseType } from '../../../Types/expenses';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';

export type ExpenseModalTabKeyType =
    | (typeof EXPENSE_MODAL_TAB)[keyof typeof EXPENSE_MODAL_TAB]['key']
    | undefined;

export type ExpenseModalPropType = {
    expenseId: number;
    expenseModalTabKey: ExpenseModalTabKeyType;
    onCloseModal: () => void;
};

export type ExpenseModalDetailsPropType = {
    expenseId: number;
    expense: ExpenseType | null;
    userRole: UserRoleType | null;
    getSingleExpense: (id: number) => Promise<void>;
};
