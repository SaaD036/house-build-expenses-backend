import { DoDetailsType, DoExpenseType } from '../../../Types/DOs';
import { HouseType } from '../../../Types/Houses';

export type DoDetailsForExpensePropTypes = {
    expenseId: number;
    house?: HouseType | null;
    doDetailsData: DoDetailsType | null;
    getDoDetailsForExpense: (houseId: number | undefined, expenseId: number) => Promise<void>;
};

export type DoExpensesListPropTypes = {
    sectionTitle: string;
    expenses: DoExpenseType[];
};

export type DoExpenseCardPropTypes = {
    expense: DoExpenseType;
};
