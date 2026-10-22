import { HouseType } from '../../../Types/Houses';
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
    house: HouseType | null | undefined;
    expense: ExpenseType | null;
    userRole: UserRoleType | null;
    getSingleExpense: (houseId: number | undefined, expenseId: number) => Promise<void>;
};
