import { CreateExpenseFormDataType, ExpenseType } from '../../../Types/expenses';

export type EditExpensePropTypes = {
    disableForm?: boolean;
    expense: ExpenseType;
    onEditSuccess?: () => void;
    onEditUnsuccess?: () => void;
    editExpense: (id: number, payloadData: CreateExpenseFormDataType) => Promise<void>;
};
