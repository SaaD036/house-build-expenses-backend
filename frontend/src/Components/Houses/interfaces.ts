import { HouseType } from '../../Types/Houses';

export type HousePageComponentPropsType = {
    tabName: string;
};

export type SeeHousePropsType = {
    currentView: string;
    houseList?: HouseType[] | null;
    houseCount?: number | null;
    houseTypes: 'your_created' | 'shared' | 'requested';
    fetchHouseList: (filters: any) => Promise<void>;
};

export type HouseTablePropsType = {
    houses: HouseType[];
    houseTypes: 'your_created' | 'shared' | 'requested';
};
