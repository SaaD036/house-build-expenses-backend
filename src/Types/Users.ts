export type LoggedinUserType = {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'visitor';
};

export type UserType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user' | 'visitor';
    accountStatus: string;
    accountEditHistory?: UserAccountEditHistoryType;
    totalExpenseCount?: number;
};

export type UserAccountEditHistoryType = {
    last_reset_pass_request_time?: Date | null;
};
