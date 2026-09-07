import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';

export type ExpenseModalTabKeyType =
    | (typeof EXPENSE_MODAL_TAB)[keyof typeof EXPENSE_MODAL_TAB]['key']
    | undefined;

export type ExpenseModalPropType = {
    expenseModalTabKey: ExpenseModalTabKeyType;
    onCloseModal: () => void;
};
