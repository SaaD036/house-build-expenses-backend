import { DO } from '../../../Types/DOs';
import { HouseType } from '../../../Types/Houses';

export type SeeDOsPropsType = {
    currentView: string;
    dos?: DO[] | null;
    doCount?: number | null;
    house?: HouseType | null;
    getAllDOs: (houseId: number | undefined, filters: any) => Promise<void>;
};
