import { HouseType } from '../../../Types/Houses';

export type CreateDOpropsType = {
    disabledForm: boolean;
    house?: HouseType | null;
    createDo: (houseId: number | undefined, formData: CreateDOformValueType) => Promise<void>;
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
