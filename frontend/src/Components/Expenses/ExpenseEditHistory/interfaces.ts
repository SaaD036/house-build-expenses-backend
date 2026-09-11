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
    expenseEditHistory: {
        history: ExpenseEditHistoryType[];
        lastUpdater: ExpendeCreatorUpdaterType | null;
    } | null;
    getExpenseEditHistory: (id: number) => Promise<void>;
};
