export type CreateUserPagePropsType = {
    disabledForm?: boolean;
    // createExpense: (createExpenseFormData: CreateExpenseFormDataType) => Promise<void>;
};

export type CreateUserFormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    role: string | null;
    accountStatus: string | null;
};
