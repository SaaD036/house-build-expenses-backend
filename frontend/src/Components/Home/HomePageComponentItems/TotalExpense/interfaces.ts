import { HouseType } from '../../../../Types/Houses';

export type TotalExpensePropsType = {
    hideDateFilters?: boolean;
    totalExpense: number | null;
    house?: HouseType | null;
    getTotalExpense: (
        houseId: number | undefined,
        formData: TotalExpenseFormDataType
    ) => Promise<void>;
};

export type TotalExpenseFormDataType = {
    formDate?: Date;
    toDate?: Date;
};
