export type CreateDOpropsType = {
    disabledForm: boolean;
    createDo: (formData: CreateDOformValueType) => Promise<void>;
};

export type CreateDOformValueType = {
    shopname: string;
    doItem: string;
    amount: number | null;
    area: string;
    ward: string;
    upazilla: string;
    district: string;
    description: string;
    doDate: Date | null;
};
