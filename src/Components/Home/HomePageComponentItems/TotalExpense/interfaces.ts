export type TotalExpensePropsType = {
    totalExpense: number | null;
    getTotalExpense: (formData: TotalExpenseFormDataType) => Promise<void>;
};

export type TotalExpenseFormDataType = {
    formDate?: Date;
    toDate?: Date;
};
