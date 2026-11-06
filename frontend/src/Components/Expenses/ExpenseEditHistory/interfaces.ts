import { HouseType } from '../../../Types/Houses';
import { ExpendeCreatorUpdaterType, ExpenseEditHistoryType } from '../../../Types/expenses';

export type ExpenseEditHistoryCardPropTypes = {
    actionName: string;
    field: string;
    actionByName: string;
    actionAt: Date;
    newValue?: string;
    oldValue?: string;
};

export type ExpenseEditHistoryPropTypes = {
    expenseId: number;
    house?: HouseType | null;
    expenseEditHistory: {
        history: ExpenseEditHistoryType[];
        lastUpdater: ExpendeCreatorUpdaterType | null;
    } | null;
    getExpenseEditHistory: (houseId: number | undefined, expenseId: number) => Promise<void>;
};
