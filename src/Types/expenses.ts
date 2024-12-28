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
