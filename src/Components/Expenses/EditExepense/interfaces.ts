import { CreateExpenseFormDataType, ExpenseType } from '../../../Types/expenses';

export type EditExpensePropTypes = {
    expense: ExpenseType;
    onEditSuccess?: () => void;
    onEditUnsuccess?: () => void;
    editExpense: (id: number, payloadData: CreateExpenseFormDataType) => Promise<void>;
};
