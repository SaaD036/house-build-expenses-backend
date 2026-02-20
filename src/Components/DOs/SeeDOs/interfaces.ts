import { DO } from '../../../Types/DOs';

export type SeeDOsPropsType = {
    currentView: string;
    dos?: DO[] | null;
    doCount?: number | null;
    getAllDOs: (filters: any) => Promise<void>;
};
