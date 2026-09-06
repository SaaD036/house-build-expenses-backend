import { CreateExpenseFormDataType } from '../../../Types/expenses';

export type CreateExpensePagePropsType = {
    disabledForm?: boolean;
    createExpense: (createExpenseFormData: CreateExpenseFormDataType) => Promise<void>;
};

export type CreateExpenseFormValueType = {
    title?: string;
    description?: string;
    amount?: number;
    expense_at: Date;
};
