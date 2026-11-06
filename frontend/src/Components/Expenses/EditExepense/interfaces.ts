import { CreateExpenseFormDataType, ExpenseType } from '../../../Types/expenses';
import { HouseType } from '../../../Types/Houses';

export type EditExpensePropTypes = {
    disableForm?: boolean;
    expense: ExpenseType;
    onEditSuccess?: () => void;
    onEditUnsuccess?: () => void;
    editExpense: (
        houseId: number | undefined,
        expenseId: number,
        payloadData: CreateExpenseFormDataType
    ) => Promise<void>;
    house: HouseType | null | undefined;
};
