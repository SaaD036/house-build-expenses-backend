export type LoggedinUserType = {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'visitor';
};

export type UserExpenseType = {
    id: number;
    amount: number;
    title: string;
    description: string;
};

export type UserType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user' | 'visitor';
    accountStatus: string;
    accountEditHistory?: UserAccountEditHistoryType;
    expenses?: UserExpenseType[];
    totalExpenseCount?: number;
};

export type AccountUserType = UserType & {
    totalExpense?: number;
};

export type UserAccountEditHistoryType = {
    lastResetPasswordTime?: Date | null;
    history?: { title?: string; createdAt?: Date }[];
};
