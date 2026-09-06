export type ExpenseType = {
    id: number;
    title: string;
    description: string;
    amount: number;
    expenseAt: Date | string;
    creator: {
        creatorID: number;
        firstName: string;
        lastName: string;
    };
    lastUpdatedAt: Date;
};

export type CreateExpenseFormDataType = {
    amount: number;
    title: string;
    description: string;
    expenseAt: string;
};
