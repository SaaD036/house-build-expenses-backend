import { UserAccessRoleType } from '.';
import { MultiTabModalTabItemType } from '../Components/Custom/CustomModal/MultiTabModal/interfaces';

export type ExpendeCreatorUpdaterType = {
    creatorID: number;
    firstName: string;
    lastName: string;
};

export type ExpenseDoType = {
    id: number;
    shopName: string;
    amount: number;
    doDatedoDate: Date;
};

export type ExpenseEditHistoryType = {
    task_type: string;
    task_at: Date;
    field: string;
    new_value: string;
    updater: ExpendeCreatorUpdaterType;
};

export type ExpenseType = {
    id: number;
    title: string;
    description: string;
    amount: number;
    expenseAt: Date | string;
    creator: ExpendeCreatorUpdaterType;
    lastUpdatedAt: Date;
    attachmentURL?: string | null;
    createdAt?: Date;
    do?: ExpenseDoType;
    lastUpdater?: ExpendeCreatorUpdaterType;
    expenseEditHistory?: ExpenseEditHistoryType[];
};

export type CreateExpenseFormDataType = {
    amount: number;
    title: string;
    description: string;
    expenseAt: string;
};

export type ExpenseModalTabType = Record<
    string,
    MultiTabModalTabItemType & { role: UserAccessRoleType }
>;
