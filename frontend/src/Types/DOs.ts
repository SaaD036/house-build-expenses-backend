import { ExpendeCreatorUpdaterType, ExpenseType } from './expenses';

export type DOcreator = {
    id: number;
    firstName: string;
    lastName: string;
};

export type DOshopAddress = {
    area: string;
    ward: string;
    upazilla: string;
    district: string;
};

export type DoExpenseType = Pick<
    ExpenseType,
    'id' | 'amount' | 'title' | 'description' | 'expenseAt'
>;

export type DO = {
    amount: number;
    createdAt?: Date;
    creator?: DOcreator;
    description: string;
    doDate: Date;
    doEditHistory?: any | null;
    doItem: string;
    id: number;
    imageURL?: string | null;
    shopAddress: DOshopAddress;
    shopName: string;
};

export type DoDetailsType = DO & {
    doEditHistoryCount?: number;
    updatedAt: string;
    expenses: DoExpenseType[];
    otherExpenseCount?: number;
    lastUpdater: ExpendeCreatorUpdaterType | null;
};
