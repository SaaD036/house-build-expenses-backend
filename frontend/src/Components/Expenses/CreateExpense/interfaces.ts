import { CreateExpenseFormDataType } from '../../../Types/expenses';
import { HouseType } from '../../../Types/Houses';

export type CreateExpensePagePropsType = {
    disabledForm?: boolean;
    house: HouseType | null | undefined;
    createExpense: (
        houseId: number | undefined,
        createExpenseFormData: CreateExpenseFormDataType
    ) => Promise<void>;
};

export type CreateExpenseFormValueType = {
    title?: string;
    description?: string;
    amount?: number;
    expense_at: Date;
};
